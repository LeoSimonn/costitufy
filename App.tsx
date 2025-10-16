import React from 'react';
import { useCostCalculator } from './hooks/useCostCalculator';
import { StepCard } from './components/StepCard';
import { CostBreakdown } from './components/CostBreakdown';
import { FixedCosts } from './components/FixedCosts';
import { Alerts } from './components/Alerts';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Select } from './components/ui/Select';
import { ArrowPathIcon, CostitufyLogoIcon } from './components/Icons';
import { Currency, ServiceType, Assumptions } from './types';
import { SERVICES } from './lib/data';

function App() {
  const {
    scenarioSteps,
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
    fetchLatestFxRate,
  } = useCostCalculator();
  
  const handleAssumptionsChange = (field: keyof Assumptions, value: number) => {
    // Prevent negative numbers which don't make sense for these fields
    if (value < 0) return;
    setAssumptions(prev => ({ ...prev, [field]: value }));
  };

  const openaiChatServiceId = SERVICES.find(s => s.providerId === 1 && s.name === ServiceType.Chat)?.id || 1;
  const googleChatServiceId = SERVICES.find(s => s.providerId === 2 && s.name === ServiceType.Chat)?.id || 2;
  const openaiImageServiceId = SERVICES.find(s => s.providerId === 1 && s.name === ServiceType.ImageGeneration)?.id || 3;
  const openaiTranscriptionServiceId = SERVICES.find(s => s.providerId === 1 && s.name === ServiceType.Transcription)?.id || 4;
  const openaiTtsServiceId = SERVICES.find(s => s.providerId === 1 && s.name === ServiceType.TTS)?.id || 5;
  const openaiVideoServiceId = SERVICES.find(s => s.providerId === 1 && s.name === ServiceType.Video)?.id || 6;
  const openaiEmbeddingsServiceId = SERVICES.find(s => s.providerId === 1 && s.name === ServiceType.Embeddings)?.id || 7;

  const googleImageServiceId = SERVICES.find(s => s.providerId === 2 && s.name === ServiceType.ImageGeneration)?.id;
  const googleTranscriptionServiceId = SERVICES.find(s => s.providerId === 2 && s.name === ServiceType.Transcription)?.id;
  const googleTtsServiceId = SERVICES.find(s => s.providerId === 2 && s.name === ServiceType.TTS)?.id;
  const googleVideoServiceId = SERVICES.find(s => s.providerId === 2 && s.name === ServiceType.Video)?.id;

  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="glass-effect border-b border-border/50 sticky top-0 z-50 shadow-md backdrop-blur-md">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="bg-gradient-to-br from-primary to-primary-hover p-2 rounded-xl shadow-lg">
              <CostitufyLogoIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                Costitufy
              </h1>
              <p className="text-xs text-muted-foreground">AI Cost Calculator</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Currency</span>
              <Select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="w-24"
              >
                <option value={Currency.USD}>USD</option>
                <option value={Currency.BRL}>BRL</option>
              </Select>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium text-muted-foreground">USD/BRL</span>
                <Input
                  type="number"
                  value={fxRate.rate.toFixed(4)}
                  onChange={(e) => updateManualFxRate(parseFloat(e.target.value))}
                  disabled={isFxLoading}
                  className="w-28"
                  step="0.01"
                />
                <Button variant="ghost" size="icon" onClick={fetchLatestFxRate} disabled={isFxLoading} aria-label="Refresh exchange rate">
                  <ArrowPathIcon className={`h-5 w-5 ${isFxLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              <div className="h-4 mt-1 text-right pr-12">
                {fxError ? (
                  <p className="text-xs text-destructive">{fxError}</p>
                ) : (
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    Source: {fxRate.source}
                    {fxRate.isDemo && <span className="ml-2 px-1.5 py-0.5 bg-yellow-400 text-yellow-950 rounded-full text-xs font-medium">DEMO</span>}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <Alerts fxRate={fxRate} />

        <div className="bg-gradient-to-br from-card to-secondary/30 border border-border/50 rounded-2xl p-6 mb-8 shadow-card animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div>
                <label htmlFor="wpm" className="block text-sm font-medium text-muted-foreground mb-1.5">Words Per Minute (WPM)</label>
                <Input id="wpm" type="number" value={assumptions.wpm} onChange={e => handleAssumptionsChange('wpm', Number(e.target.value))} />
                <p className="text-xs text-muted-foreground mt-1.5">Estimates words from audio. Updates calculations live.</p>
              </div>
              <div>
                <label htmlFor="runsPerMonth" className="block text-sm font-medium text-muted-foreground mb-1.5">Executions per Month</label>
                <Input id="runsPerMonth" type="number" value={assumptions.runsPerMonth} onChange={e => handleAssumptionsChange('runsPerMonth', Number(e.target.value))} />
                <p className="text-xs text-muted-foreground mt-1.5">For calculating total monthly costs.</p>
              </div>
              <div>
                <label htmlFor="languageFactor" className="block text-sm font-medium text-muted-foreground mb-1.5">Language Factor</label>
                <Input id="languageFactor" type="number" step="0.1" value={assumptions.languageFactor} onChange={e => handleAssumptionsChange('languageFactor', Number(e.target.value))} />
                <p className="text-xs text-muted-foreground mt-1.5">Adjust for language density (e.g., PT-BR: 1.0).</p>
              </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column: Builder */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Scenario Builder</h2>
              {scenarioSteps.map((step, index) => (
                <StepCard
                  key={step.id}
                  step={step}
                  updateStep={updateStep}
                  removeStep={removeStep}
                  duplicateStep={duplicateStep}
                  currency={currency}
                  fxRate={fxRate.rate}
                  index={index}
                />
              ))}
              <div className="mt-6 p-6 border-2 border-dashed border-primary/20 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/40 transition-all duration-300">
                 <h3 className="text-lg font-semibold mb-3 text-foreground">Add a new step</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">OpenAI</p>
                        <div className="flex flex-wrap gap-2">
                             <Button variant="outline" size="sm" onClick={() => addStep(1, openaiChatServiceId)}>+ Text</Button>
                             <Button variant="outline" size="sm" onClick={() => addStep(1, openaiTranscriptionServiceId)}>+ Transcription</Button>
                             <Button variant="outline" size="sm" onClick={() => addStep(1, openaiImageServiceId)}>+ Image</Button>
                             <Button variant="outline" size="sm" onClick={() => addStep(1, openaiVideoServiceId)}>+ Video</Button>
                             <Button variant="outline" size="sm" onClick={() => addStep(1, openaiTtsServiceId)}>+ Speech</Button>
                             <Button variant="outline" size="sm" onClick={() => addStep(1, openaiEmbeddingsServiceId)}>+ Embeddings</Button>
                        </div>
                    </div>
                     <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Google</p>
                        <div className="flex flex-wrap gap-2">
                             <Button variant="outline" size="sm" onClick={() => addStep(2, googleChatServiceId)}>+ Text</Button>
                             {googleTranscriptionServiceId && <Button variant="outline" size="sm" onClick={() => addStep(2, googleTranscriptionServiceId)}>+ Transcription</Button>}
                             {googleImageServiceId && <Button variant="outline" size="sm" onClick={() => addStep(2, googleImageServiceId)}>+ Image</Button>}
                              {googleVideoServiceId && <Button variant="outline" size="sm" onClick={() => addStep(2, googleVideoServiceId)}>+ Video</Button>}
                             {googleTtsServiceId && <Button variant="outline" size="sm" onClick={() => addStep(2, googleTtsServiceId)}>+ Speech</Button>}
                        </div>
                    </div>
                 </div>
              </div>
            </div>

            <FixedCosts
              fixedCosts={fixedCosts}
              addFixedCost={addFixedCost}
              updateFixedCost={updateFixedCost}
              removeFixedCost={removeFixedCost}
            />
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-2 space-y-8">
            <CostBreakdown
              costBreakdown={costBreakdown}
              fixedCosts={fixedCosts}
              totalVariableCost={totalVariableCost}
              totalFixedCost={totalFixedCost}
              currency={currency}
              fxRate={fxRate.rate}
              runsPerMonth={assumptions.runsPerMonth}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;