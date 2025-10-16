
import React from 'react';
import type { Assumptions } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Input } from './ui/Input';

interface AssumptionsPanelProps {
  assumptions: Assumptions;
  setAssumptions: React.Dispatch<React.SetStateAction<Assumptions>>;
}

export const AssumptionsPanel: React.FC<AssumptionsPanelProps> = ({ assumptions, setAssumptions }) => {
  const handleChange = (field: keyof Assumptions, value: number) => {
    setAssumptions(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assumptions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <label htmlFor="wpm" className="block text-sm font-medium text-muted-foreground mb-1.5">Words Per Minute (WPM)</label>
          <Input
            id="wpm"
            type="number"
            value={assumptions.wpm}
            onChange={e => handleChange('wpm', Number(e.target.value))}
          />
          <p className="text-xs text-muted-foreground mt-1.5">Used to estimate words from audio. Default: 150.</p>
        </div>
        <div>
          <label htmlFor="languageFactor" className="block text-sm font-medium text-muted-foreground mb-1.5">Language Factor</label>
          <Input
            id="languageFactor"
            type="number"
            step="0.1"
            value={assumptions.languageFactor}
            onChange={e => handleChange('languageFactor', Number(e.target.value))}
          />
          <p className="text-xs text-muted-foreground mt-1.5">Adjust for language density. PT-BR: 1.0.</p>
        </div>
         <div>
          <label htmlFor="runsPerMonth" className="block text-sm font-medium text-muted-foreground mb-1.5">Executions per Month</label>
          <Input
            id="runsPerMonth"
            type="number"
            value={assumptions.runsPerMonth}
            onChange={e => handleChange('runsPerMonth', Number(e.target.value))}
          />
          <p className="text-xs text-muted-foreground mt-1.5">For calculating total monthly costs.</p>
        </div>
      </CardContent>
    </Card>
  );
};
