import React, { useMemo } from 'react';
import type { FxRate } from '../types';
import { WarningIcon } from './Icons';

interface AlertsProps {
  fxRate: FxRate;
}

export const Alerts: React.FC<AlertsProps> = ({ fxRate }) => {
  const isOutdated = useMemo(() => {
    const rateDate = new Date(fxRate.asOfDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return rateDate < yesterday;
  }, [fxRate]);

  if (!isOutdated) {
    return null;
  }

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md my-4 flex items-center">
      <WarningIcon className="h-6 w-6 mr-3" />
      <div>
        <p className="font-bold">Data sources may be outdated.</p>
        <p className="text-sm">The currency exchange rate is from {fxRate.asOfDate}. Consider updating sources for the most accurate estimate.</p>
      </div>
    </div>
  );
};