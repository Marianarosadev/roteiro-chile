import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import { Wallet } from 'lucide-react';

interface CostBadgeProps {
  amountBRL: number;
  amountCLP: number;
  compact?: boolean;
}

export const CostBadge: React.FC<CostBadgeProps> = React.memo(({ amountBRL, amountCLP, compact = false }) => {
  const hasBRL = amountBRL > 0;
  const hasCLP = amountCLP > 0;

  if (!hasBRL && !hasCLP) {
    return null;
  }

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
        {hasBRL && <span>{formatCurrency(amountBRL, 'BRL')}</span>}
        {hasBRL && hasCLP && <span className="text-slate-400">•</span>}
        {hasCLP && <span className="text-slate-500 dark:text-slate-400">{formatCurrency(amountCLP, 'CLP')}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {hasBRL && (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded-md">
          <Wallet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          {formatCurrency(amountBRL, 'BRL')}
        </span>
      )}
      {hasCLP && (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md">
          {formatCurrency(amountCLP, 'CLP')}
        </span>
      )}
    </div>
  );
});

CostBadge.displayName = 'CostBadge';
