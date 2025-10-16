import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import type { FixedCost } from '../types';
import { Currency, BillingCycle } from '../types';

interface CostBreakdownProps {
  costBreakdown: { name: string; cost: number; percentage: number; isBottleneck: boolean }[];
  fixedCosts: FixedCost[];
  totalVariableCost: number;
  totalFixedCost: number;
  currency: Currency;
  fxRate: number;
  runsPerMonth: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const formatCurrency = (amount: number, currency: Currency, fxRate: number) => {
    const value = currency === Currency.BRL ? amount * fxRate : amount;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
    }).format(value);
};

export const CostBreakdown: React.FC<CostBreakdownProps> = ({
  costBreakdown,
  fixedCosts,
  totalVariableCost,
  totalFixedCost,
  currency,
  fxRate,
  runsPerMonth
}) => {

    const totalMonthlyCost = useMemo(() => {
        return (totalVariableCost * runsPerMonth) + totalFixedCost;
    }, [totalVariableCost, totalFixedCost, runsPerMonth]);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-60 w-full mb-6">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={costBreakdown}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="cost"
                                nameKey="name"
                                // FIX: Ensure 'percent' is a number before performing arithmetic operations to prevent type errors.
                                label={({ name, percent }) => `${name.split(':')[0]} ${((typeof percent === 'number' ? percent : 0) * 100).toFixed(0)}%`}
                            >
                                {costBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value, currency, fxRate)} />
                            <Legend wrapperStyle={{fontSize: '0.875rem'}}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="space-y-3">
                    {costBreakdown.map((item, index) => (
                        <div key={index} className={`p-3 rounded-lg ${item.isBottleneck ? 'bg-destructive/20' : 'bg-secondary'}`}>
                           <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-secondary-foreground">{item.name}</p>
                                    {item.isBottleneck && <p className="text-xs text-destructive-foreground/80 font-bold">COST BOTTLENECK (&gt;60%)</p>}
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-secondary-foreground">{formatCurrency(item.cost, currency, fxRate)}</p>
                                    <p className="text-sm text-muted-foreground">{item.percentage.toFixed(2)}%</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                    <div className="space-y-4">
                       <div className="flex justify-between items-baseline">
                            <span className="font-semibold text-foreground">Total per Execution</span>
                            <span className="font-bold text-xl text-primary">{formatCurrency(totalVariableCost, currency, fxRate)}</span>
                        </div>
                         <div className="p-4 bg-secondary border border-border rounded-lg space-y-2">
                            <div className="flex justify-between items-baseline">
                                <span className="font-semibold text-foreground">Total per Month</span>
                                <span className="font-bold text-2xl text-primary">{formatCurrency(totalMonthlyCost, currency, fxRate)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground text-right">
                                Based on {runsPerMonth.toLocaleString()} execution(s) / mo
                            </p>
                            <div className="pt-2 border-t border-border text-sm text-muted-foreground space-y-1">
                                <div className="flex justify-between">
                                    <span>└ Variable Costs</span>
                                    <span>{formatCurrency(totalVariableCost * runsPerMonth, currency, fxRate)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>└ Fixed Costs</span>
                                    <span>{formatCurrency(totalFixedCost, currency, fxRate)}</span>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
};