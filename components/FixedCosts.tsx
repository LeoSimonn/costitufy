
import React from 'react';
import type { FixedCost } from '../types';
import { Currency, BillingCycle } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { TrashIcon, PlusCircleIcon } from './Icons';

interface FixedCostsProps {
  fixedCosts: FixedCost[];
  addFixedCost: () => void;
  updateFixedCost: (id: string, newValues: Partial<FixedCost>) => void;
  removeFixedCost: (id: string) => void;
}

export const FixedCosts: React.FC<FixedCostsProps> = ({ fixedCosts, addFixedCost, updateFixedCost, removeFixedCost }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fixed & Infrastructure Costs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {fixedCosts.map(cost => (
            <div key={cost.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
              <Input
                placeholder="Item Name (e.g., Vercel Pro)"
                value={cost.name}
                onChange={e => updateFixedCost(cost.id, { name: e.target.value })}
                className="md:col-span-4"
              />
              <Input
                type="number"
                placeholder="Amount"
                value={cost.amount}
                onChange={e => updateFixedCost(cost.id, { amount: Number(e.target.value) })}
                className="md:col-span-2"
              />
              <Select
                value={cost.currency}
                onChange={e => updateFixedCost(cost.id, { currency: e.target.value as Currency })}
                className="md:col-span-2"
              >
                {Object.values(Currency).map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
              <Select
                value={cost.cycle}
                onChange={e => updateFixedCost(cost.id, { cycle: e.target.value as BillingCycle })}
                className="md:col-span-3"
              >
                {Object.values(BillingCycle).map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
              <Button variant="ghost" size="icon" onClick={() => removeFixedCost(cost.id)} className="md:col-span-1 justify-self-end">
                <TrashIcon className="h-5 w-5 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" onClick={addFixedCost} className="mt-4 w-full">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Add Fixed Cost
        </Button>
      </CardContent>
    </Card>
  );
};
