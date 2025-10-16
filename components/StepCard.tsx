import React, { useMemo } from 'react';
import type { ScenarioStep } from '../types';
import { Currency, ServiceType, EstimationMode } from '../types';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { TrashIcon, CopyIcon } from './Icons';
import { PROVIDERS, SERVICES, MODELS, PRICE_CATALOG } from '../lib/data';

interface StepCardProps {
  step: ScenarioStep;
  updateStep: (id: string, newValues: Partial<ScenarioStep>) => void;
  removeStep: (id: string) => void;
  duplicateStep: (id: string) => void;
  currency: Currency;
  fxRate: number;
  index: number;
}

const formatCurrency = (amount: number, currency: Currency, fxRate: number) => {
    const value = currency === Currency.BRL ? amount * fxRate : amount;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
    }).format(value);
};

const commonUseCases = [
    { label: 'Custom', inputWords: 0, outputWords: 0 },
    { label: 'Short Summary', inputWords: 800, outputWords: 150 },
    { label: 'Detailed Summary', inputWords: 3000, outputWords: 800 },
    { label: 'Brainstorm Ideas', inputWords: 200, outputWords: 500 },
    { label: 'Translate Text', inputWords: 1000, outputWords: 1000 },
    { label: 'Code Generation', inputWords: 100, outputWords: 400 },
];

const Field: React.FC<{label: string, children: React.ReactNode}> = ({label, children}) => (
    <div>
        <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
        {children}
    </div>
);


export const StepCard: React.FC<StepCardProps> = ({ step, updateStep, removeStep, duplicateStep, currency, fxRate, index }) => {
    const service = SERVICES.find(s => s.id === step.serviceId);
    const provider = PROVIDERS.find(p => p.id === step.providerId);
    const price = PRICE_CATALOG.find(p => p.modelId === step.modelId && p.tier === step.tier);
    
    const availableServices = useMemo(() => SERVICES.filter(s => s.providerId === step.providerId), [step.providerId]);
    const availableModels = useMemo(() => MODELS.filter(m => m.serviceId === step.serviceId), [step.serviceId]);
    const availableTiers = useMemo(() => {
      return [...new Set(PRICE_CATALOG.filter(p => p.modelId === step.modelId).map(p => p.tier))].sort();
    }, [step.modelId]);

    const groupedModels = useMemo(() => {
        return availableModels.reduce((acc, model) => {
            const groupName = model.group || 'Other';
            if (!acc[groupName]) {
                acc[groupName] = [];
            }
            acc[groupName].push(model);
            return acc;
        }, {} as Record<string, typeof availableModels>);
    }, [availableModels]);

    const isChained = !!step.chainInput && index > 0;
    
    const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newProviderId = Number(e.target.value);
        const firstServiceForProvider = SERVICES.find(s => s.providerId === newProviderId);
        if (firstServiceForProvider) {
            updateStep(step.id, { providerId: newProviderId, serviceId: firstServiceForProvider.id });
        }
    };
    
    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newServiceId = Number(e.target.value);
        updateStep(step.id, { serviceId: newServiceId });
    };

    const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateStep(step.id, { modelId: Number(e.target.value) });
    };

    const handleTierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateStep(step.id, { tier: e.target.value });
    };
    
    const handleEstimationModeChange = (mode: EstimationMode) => {
        updateStep(step.id, { estimationMode: mode });
    };

    const handleUseCaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCase = commonUseCases[Number(e.target.value)];
        if (selectedCase && selectedCase.label !== 'Custom') {
            updateStep(step.id, { 
                inputWords: selectedCase.inputWords, 
                outputWords: selectedCase.outputWords 
            });
        }
    };


    const renderInputs = () => {
        const commonChatInputs = (
             <>
                {price && price.cachedInputPriceUSD > 0 && (
                    <div className="mt-4">
                       <Field label="Cached Input Tokens">
                         <Input type="number" value={step.cachedInputTokens || ''} onChange={e => updateStep(step.id, { cachedInputTokens: Number(e.target.value) })} placeholder="e.g., 50000" />
                        </Field>
                    </div>
                )}
             </>
        );

        switch (service?.name) {
            case ServiceType.Transcription:
                return (
                    <Field label="Audio Duration (min)">
                        <Input type="number" value={step.audioMinutes || ''} onChange={e => updateStep(step.id, { audioMinutes: Number(e.target.value) })} placeholder="e.g., 30"/>
                        {step.estimatedWords && step.estimatedWords > 0 && (
                           <div className="text-sm p-2 bg-secondary rounded-md text-center text-muted-foreground mt-2">
                               Est. Words from Audio: <strong>{step.estimatedWords.toLocaleString()}</strong>
                           </div>
                        )}
                    </Field>
                );
            case ServiceType.ImageGeneration:
                return (
                    <Field label="Number of Images">
                        <Input type="number" value={step.imageCount || ''} onChange={e => updateStep(step.id, { imageCount: Number(e.target.value) })} placeholder="e.g., 10"/>
                    </Field>
                );
            case ServiceType.TTS:
                 return (
                    <Field label="Number of Characters">
                        <Input type="number" value={step.characterCount || ''} onChange={e => updateStep(step.id, { characterCount: Number(e.target.value) })} placeholder="e.g., 10000"/>
                    </Field>
                );
            case ServiceType.Video:
                 return (
                    <Field label="Video Duration (seconds)">
                        <Input type="number" value={step.videoSeconds || ''} onChange={e => updateStep(step.id, { videoSeconds: Number(e.target.value) })} placeholder="e.g., 30"/>
                    </Field>
                );
            case ServiceType.Chat:
            case ServiceType.Embeddings:
                return (
                    <div className="space-y-4">
                        <div>
                             <label className="block text-sm font-medium text-muted-foreground mb-1.5">Mode</label>
                            <div className="flex items-center space-x-2">
                                <Button className="flex-1" size="sm" variant={step.estimationMode === EstimationMode.Estimate ? 'secondary' : 'outline'} onClick={() => handleEstimationModeChange(EstimationMode.Estimate)} disabled={isChained && step.estimationMode === EstimationMode.Exact}>Estimate by Words</Button>
                                <Button className="flex-1" size="sm" variant={step.estimationMode === EstimationMode.Exact ? 'secondary' : 'outline'} onClick={() => handleEstimationModeChange(EstimationMode.Exact)} disabled={isChained}>Use Exact Tokens</Button>
                            </div>
                        </div>

                        {isChained && step.estimationMode === EstimationMode.Exact ? (
                             <div className="text-sm p-3 bg-secondary rounded-md text-center text-muted-foreground">Input (tokens) is automatically set from the previous chat step.</div>
                        ): isChained && step.estimationMode === EstimationMode.Estimate ? (
                             <div className="text-sm p-3 bg-secondary rounded-md text-center text-muted-foreground">Input (words) is automatically set from the previous transcription step.</div>
                        ) : step.estimationMode === EstimationMode.Estimate ? (
                            <>
                                <Field label="Common Use Cases">
                                    <Select onChange={handleUseCaseChange}>
                                        {commonUseCases.map((uc, idx) => (
                                            <option key={uc.label} value={idx}>{uc.label}</option>
                                        ))}
                                    </Select>
                                </Field>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field label="Input Words">
                                        <Input type="number" value={step.inputWords || ''} onChange={e => updateStep(step.id, { inputWords: Number(e.target.value) })} placeholder="e.g., 800" disabled={isChained} />
                                    </Field>
                                    <Field label="Output Words">
                                        <Input type="number" value={step.outputWords || ''} onChange={e => updateStep(step.id, { outputWords: Number(e.target.value) })} placeholder="e.g., 200" />
                                    </Field>
                                </div>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Input Tokens">
                                    <Input type="number" value={step.inputTokens || ''} onChange={e => updateStep(step.id, { inputTokens: Number(e.target.value) })} placeholder="e.g., 1067" disabled={isChained} />
                                </Field>
                                <Field label="Output Tokens">
                                    <Input type="number" value={step.outputTokens || ''} onChange={e => updateStep(step.id, { outputTokens: Number(e.target.value) })} placeholder="e.g., 267" />
                                </Field>
                            </div>
                        )}
                        {commonChatInputs}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card className="mb-4 overflow-hidden">
            <CardHeader className="p-4 bg-secondary/50 border-b flex-row justify-between items-center">
                <h4 className="font-semibold text-lg">Step {index + 1}: {service?.displayName}</h4>
                <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => duplicateStep(step.id)} aria-label="Duplicate step">
                       <CopyIcon className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeStep(step.id)} aria-label="Remove step">
                       <TrashIcon className="h-5 w-5 text-destructive" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="px-6 pt-4 pb-6 space-y-8">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                     <Field label="Provider">
                        <Select value={step.providerId} onChange={handleProviderChange}>
                            {PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </Select>
                    </Field>
                    <Field label="Service">
                        <Select value={step.serviceId} onChange={handleServiceChange}>
                            {availableServices.map(s => <option key={s.id} value={s.id}>{s.displayName}</option>)}
                        </Select>
                    </Field>
                    <Field label="Model">
                        <Select value={step.modelId} onChange={handleModelChange}>
                            {Object.entries(groupedModels).map(([groupName, models]) => (
                                <optgroup key={groupName} label={groupName}>
                                    {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </optgroup>
                            ))}
                        </Select>
                    </Field>
                     <Field label="Tier">
                        <Select value={step.tier} onChange={handleTierChange} disabled={availableTiers.length === 0}>
                            {availableTiers.length > 0 ? (
                                availableTiers.map(t => <option key={t} value={t}>{t}</option>)
                            ) : (
                                <option>N/A</option>
                            )}
                        </Select>
                    </Field>
                  </div>
                 {price && (
                    <div className="text-sm text-muted-foreground mt-3 text-right bg-muted/30 rounded-lg px-3 py-2">
                        <span className="font-medium">Pricing:</span> 
                        {` $${price.inputPriceUSD.toFixed(4)} (in)`}
                        {price.cachedInputPriceUSD > 0 && ` / $${price.cachedInputPriceUSD.toFixed(4)} (cached)`}
                        {price.outputPriceUSD > 0 && ` / $${price.outputPriceUSD.toFixed(4)} (out)`}
                        {` ${price.unitNotes}`}
                        {price.isDemo && <span className="ml-2 px-1.5 py-0.5 bg-yellow-400 text-yellow-950 rounded-full font-medium">DEMO</span>}
                    </div>
                )}
                </div>
                
                {index > 0 && (service?.name === ServiceType.Chat || service?.name === ServiceType.Embeddings) && (
                  <div className="flex items-center space-x-2 py-3 border-t border-b">
                    <input 
                      type="checkbox" 
                      id={`chain-${step.id}`} 
                      checked={!!step.chainInput} 
                      onChange={e => updateStep(step.id, { chainInput: e.target.checked })}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <label htmlFor={`chain-${step.id}`} className="text-sm font-medium text-foreground select-none">
                      Use output from previous step as input
                    </label>
                  </div>
                )}

                {renderInputs()}

                <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between items-center bg-secondary p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">
                            {(service?.name === ServiceType.Chat || service?.name === ServiceType.Embeddings) && (
                                <span>Est. Tokens: {step.estimatedInputTokens.toLocaleString()} in / {step.estimatedOutputTokens.toLocaleString()} out</span>
                            )}
                            {service?.name === ServiceType.Transcription && step.estimatedInputTokens > 0 &&(
                                <span>Est. Tokens from Audio: {step.estimatedInputTokens.toLocaleString()}</span>
                            )}
                        </div>
                        <div className="text-right">
                           <p className="font-semibold text-xl text-foreground">{formatCurrency(step.cost, currency, fxRate)}</p>
                           <p className="text-xs text-muted-foreground">/ execution</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};