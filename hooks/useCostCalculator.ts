import { useState, useCallback, useMemo, useEffect } from 'react';
import type { ScenarioStep, FixedCost, Assumptions, FxRate, Model } from '../types';
import { Currency, ServiceType, EstimationMode, BillingCycle } from '../types';
import { calculateLlmCost, calculateCost, estimateTokensFromWords, estimateWordsFromAudio } from '../lib/costs/formulas';
import { PRICE_CATALOG, FX_RATES, MODELS, SERVICES, PROVIDERS } from '../lib/data';

const initialAssumptions: Assumptions = {
    wpm: 150,
    languageFactor: 1.0,
    runsPerMonth: 1,
};

const initialScenario: ScenarioStep[] = [
    {
        id: `step-${Date.now()}-1`,
        providerId: 1,
        serviceId: 4,
        modelId: MODELS.find(m => m.name === 'Whisper')?.id || 0,
        tier: 'Standard',
        estimationMode: EstimationMode.Estimate,
        audioMinutes: 30,
        estimatedInputTokens: 0,
        estimatedOutputTokens: 0,
        estimatedWords: 0,
        cost: 0,
    },
    {
        id: `step-${Date.now()}-2`,
        providerId: 1,
        serviceId: 1,
        modelId: MODELS.find(m => m.name === 'gpt-4o')?.id || 0,
        tier: 'Standard',
        estimationMode: EstimationMode.Estimate,
        chainInput: true,
        inputWords: 800,
        outputWords: 200,
        estimatedInputTokens: 0,
        estimatedOutputTokens: 0,
        cost: 0,
    },
];

export function useCostCalculator() {
    const [scenarioSteps, setScenarioSteps] = useState<ScenarioStep[]>(initialScenario);
    const [fixedCosts, setFixedCosts] = useState<FixedCost[]>([]);
    const [assumptions, setAssumptions] = useState<Assumptions>(initialAssumptions);
    const [currency, setCurrency] = useState<Currency>(Currency.USD);
    const [fxRate, setFxRate] = useState<FxRate>(FX_RATES[0]);
    const [isFxLoading, setIsFxLoading] = useState<boolean>(true);
    const [isFxRateManual, setIsFxRateManual] = useState<boolean>(false);
    const [fxError, setFxError] = useState<string | null>(null);

    const getModel = useCallback((modelId: number): Model | undefined => MODELS.find(m => m.id === modelId), []);
    const getService = useCallback((serviceId: number) => SERVICES.find(s => s.id === serviceId), []);

    const fetchLatestFxRate = useCallback(() => {
        setIsFxLoading(true);
        setIsFxRateManual(false);
        setFxError(null);
        fetch('https://api.frankfurter.app/latest?from=USD&to=BRL')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json()
            })
            .then(data => {
                if (data?.rates?.BRL) {
                     setFxRate({
                        ...FX_RATES[0],
                        rate: data.rates.BRL,
                        asOfDate: data.date,
                        source: 'frankfurter.app',
                        isDemo: false,
                    });
                } else {
                    throw new Error('Invalid API response structure');
                }
            })
            .catch(error => {
                console.error("Failed to fetch exchange rate:", error);
                setFxError("Failed to fetch latest rate.");
            })
            .finally(() => setIsFxLoading(false));
    }, []);

    useEffect(() => {
        fetchLatestFxRate();
    }, [fetchLatestFxRate]);

    const updateManualFxRate = useCallback((newRate: number) => {
        if (isNaN(newRate) || newRate <= 0) return;
        setIsFxRateManual(true);
        setFxError(null);
        setFxRate(prev => ({
            ...prev,
            rate: newRate,
            asOfDate: new Date().toISOString().split('T')[0],
            source: 'Manual Override'
        }));
    }, []);

    const calculatedSteps = useMemo(() => {
        return scenarioSteps.reduce<ScenarioStep[]>((acc, step, index) => {
            const currentStep = { ...step };
            const service = getService(currentStep.serviceId);
            const price = PRICE_CATALOG.find(p => p.modelId === currentStep.modelId && p.tier === currentStep.tier);

            let cost = 0;
            let inputTokensForCalc = 0;
            let outputTokensForCalc = 0;
            let estimatedWordsFromAudio = 0;
            
            // Handle chained input first to set the correct input values
            if (currentStep.chainInput && index > 0) {
                const prevStep = acc[index - 1];
                const prevService = getService(prevStep.serviceId);
                if (prevService?.name === ServiceType.Transcription) {
                    // Chain from transcription uses estimated words
                    currentStep.inputWords = prevStep.estimatedWords || 0;
                    currentStep.estimationMode = EstimationMode.Estimate; // Force estimate mode
                } else if (prevService?.name === ServiceType.Chat) {
                    // Chain from chat uses output tokens
                    inputTokensForCalc = prevStep.estimatedOutputTokens;
                    currentStep.estimationMode = EstimationMode.Exact; // Force exact mode
                    currentStep.inputTokens = inputTokensForCalc;
                }
            }

            if (!price) {
                // No price found, cost is 0
            } else if (service?.name === ServiceType.Transcription) {
                const minutes = currentStep.audioMinutes || 0;
                cost = calculateCost(minutes, price.inputPriceUSD, price.scale);
                const words = estimateWordsFromAudio(minutes, assumptions.wpm, assumptions.languageFactor);
                estimatedWordsFromAudio = words;
                inputTokensForCalc = estimateTokensFromWords(words); // Tokens are still calculated for context
            } else if (service?.name === ServiceType.Chat || service?.name === ServiceType.Embeddings) {
                if (currentStep.estimationMode === EstimationMode.Estimate) {
                    inputTokensForCalc = estimateTokensFromWords(currentStep.inputWords || 0);
                    outputTokensForCalc = estimateTokensFromWords(currentStep.outputWords || 0);
                } else {
                    inputTokensForCalc = currentStep.inputTokens || 0;
                    outputTokensForCalc = currentStep.outputTokens || 0;
                }
                cost = calculateLlmCost(
                    inputTokensForCalc, 
                    outputTokensForCalc, 
                    currentStep.cachedInputTokens || 0,
                    price.inputPriceUSD, 
                    price.outputPriceUSD,
                    price.cachedInputPriceUSD, 
                    price.scale
                );
            } else if (service?.name === ServiceType.ImageGeneration) {
                cost = calculateCost(currentStep.imageCount || 0, price.inputPriceUSD, price.scale);
            } else if (service?.name === ServiceType.TTS) {
                cost = calculateCost(currentStep.characterCount || 0, price.inputPriceUSD, price.scale);
            } else if (service?.name === ServiceType.Video) {
                cost = calculateCost(currentStep.videoSeconds || 0, price.inputPriceUSD, price.scale);
            }

            const calculatedStep: ScenarioStep = {
                ...currentStep,
                cost,
                estimatedWords: estimatedWordsFromAudio > 0 ? estimatedWordsFromAudio : currentStep.estimatedWords,
                estimatedInputTokens: inputTokensForCalc,
                estimatedOutputTokens: outputTokensForCalc,
            };

            return [...acc, calculatedStep];
        }, []);
    }, [scenarioSteps, assumptions, getService]);

    const totalVariableCost = useMemo(() => calculatedSteps.reduce((acc, step) => acc + step.cost, 0), [calculatedSteps]);

    const totalFixedCost = useMemo(() => {
        return fixedCosts.reduce((acc, cost) => {
            let monthlyCost = cost.amount;
            if (cost.cycle === BillingCycle.Yearly) {
                monthlyCost /= 12;
            }
            if (cost.currency === Currency.BRL && fxRate.rate > 0) {
                monthlyCost /= fxRate.rate;
            }
            return acc + monthlyCost;
        }, 0);
    }, [fixedCosts, fxRate]);

    const costBreakdown = useMemo(() => {
        const total = totalVariableCost;
        if (total === 0) return [];
        return calculatedSteps.map((step, index) => {
            const model = getModel(step.modelId);
            const provider = PROVIDERS.find(p => p.id === step.providerId)
            return {
                name: `Step ${index + 1}: ${model?.name || 'N/A'} (${step.tier})`,
                cost: step.cost,
                percentage: (step.cost / total) * 100,
                isBottleneck: (step.cost / total) >= 0.6,
            };
        });
    }, [calculatedSteps, totalVariableCost, getModel]);

    const addStep = useCallback((providerId: number, serviceId: number) => {
        const defaultModel = MODELS.find(m => m.serviceId === serviceId);
        if (!defaultModel) return;
        const service = SERVICES.find(s => s.id === serviceId);
        const availableTiers = [...new Set(PRICE_CATALOG.filter(p => p.modelId === defaultModel.id).map(p => p.tier))];
        const defaultTier = availableTiers.includes('Standard') ? 'Standard' : availableTiers[0];

        const newStep: ScenarioStep = {
            id: `step-${Date.now()}`,
            providerId: providerId,
            serviceId: serviceId,
            modelId: defaultModel.id,
            tier: defaultTier || '',
            estimationMode: EstimationMode.Estimate,
            chainInput: false,
            audioMinutes: service?.name === ServiceType.Transcription ? 10 : undefined,
            inputWords: service?.name === ServiceType.Chat ? 500 : undefined,
            outputWords: service?.name === ServiceType.Chat ? 150 : undefined,
            imageCount: service?.name === ServiceType.ImageGeneration ? 1 : undefined,
            characterCount: service?.name === ServiceType.TTS ? 1000 : undefined,
            videoSeconds: service?.name === ServiceType.Video ? 10 : undefined,
            cachedInputTokens: service?.name === ServiceType.Chat ? 0 : undefined,
            cost: 0,
            estimatedInputTokens: 0,
            estimatedOutputTokens: 0,
        };
        setScenarioSteps(prev => [...prev, newStep]);
    }, []);

    const updateStep = useCallback((id: string, newValues: Partial<ScenarioStep>) => {
        setScenarioSteps(prev => prev.map(step => {
            if (step.id !== id) return step;

            const updatedStep = { ...step, ...newValues };
            
            if (newValues.serviceId || newValues.providerId || newValues.modelId) {
                let targetModelId = updatedStep.modelId;

                if(newValues.serviceId || newValues.providerId) {
                    const firstModelForService = MODELS.find(m => m.serviceId === updatedStep.serviceId);
                    targetModelId = firstModelForService?.id || 0;
                    updatedStep.modelId = targetModelId;
                }

                const availableTiers = [...new Set(PRICE_CATALOG.filter(p => p.modelId === targetModelId).map(p => p.tier))];
                if (!availableTiers.includes(updatedStep.tier)) {
                    updatedStep.tier = availableTiers.includes('Standard') ? 'Standard' : availableTiers[0] || '';
                }
            }
            
            return updatedStep;
        }));
    }, []);

    const removeStep = useCallback((id: string) => {
        setScenarioSteps(prev => prev.filter(step => step.id !== id));
    }, []);
    
    const duplicateStep = useCallback((id: string) => {
        setScenarioSteps(prev => {
            const stepToDuplicate = prev.find(step => step.id === id);
            if (!stepToDuplicate) return prev;
            const newStep = { ...stepToDuplicate, id: `step-${Date.now()}` };
            const index = prev.findIndex(step => step.id === id);
            const newSteps = [...prev];
            newSteps.splice(index + 1, 0, newStep);
            return newSteps;
        });
    }, []);

    const addFixedCost = useCallback(() => {
        const newCost: FixedCost = {
            id: `fixed-${Date.now()}`,
            name: 'New Item',
            cycle: BillingCycle.Monthly,
            amount: 10,
            currency: Currency.USD,
        };
        setFixedCosts(prev => [...prev, newCost]);
    }, []);

    const updateFixedCost = useCallback((id: string, newValues: Partial<FixedCost>) => {
        setFixedCosts(prev => prev.map(cost => cost.id === id ? { ...cost, ...newValues } : cost));
    }, []);

    const removeFixedCost = useCallback((id: string) => {
        setFixedCosts(prev => prev.filter(cost => cost.id !== id));
    }, []);

    return {
        scenarioSteps: calculatedSteps,
        fixedCosts,
        assumptions,
        currency,
        fxRate,
        isFxLoading,
        fxError,
        totalVariableCost,
        totalFixedCost,
        costBreakdown,
        setAssumptions,
        setCurrency,
        addStep,
        updateStep,
        removeStep,
        duplicateStep,
        addFixedCost,
        updateFixedCost,
        removeFixedCost,
        updateManualFxRate,
        fetchLatestFxRate
    };
}