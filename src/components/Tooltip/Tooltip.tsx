import React from 'react';
import { Activity } from '../../types/itinerary';
import { CostBadge } from '../CostBadge/CostBadge';
import { PaymentBadge } from '../PaymentBadge/PaymentBadge';
import { ActivityBadge } from '../ActivityBadge/ActivityBadge';
import { Clock, Info } from 'lucide-react';

interface TooltipProps {
  activity: Activity;
  position?: { x: number; y: number };
}

export const Tooltip: React.FC<TooltipProps> = React.memo(({ activity }) => {
  return (
    <div className="p-3 max-w-xs sm:max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl text-slate-800 dark:text-slate-100 text-xs space-y-2 pointer-events-none transition-all duration-150">
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
        <ActivityBadge activityType={activity.activityType} />
        <div className="flex items-center gap-1 font-mono text-slate-500 dark:text-slate-400 font-medium">
          <Clock className="w-3 h-3" />
          <span>{activity.startTime}</span>
          {activity.endTime && <span> - {activity.endTime}</span>}
        </div>
      </div>

      <p className="font-semibold text-slate-900 dark:text-slate-50 text-sm leading-snug">
        {activity.description}
      </p>

      {activity.importantInfo && (
        <div className="flex items-start gap-1.5 p-2 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60 rounded-md text-[11px]">
          <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <span>{activity.importantInfo}</span>
        </div>
      )}

      <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
        <CostBadge amountBRL={activity.amountBRL} amountCLP={activity.amountCLP} compact />
        <PaymentBadge paymentStatus={activity.paymentStatus} paymentMethod={activity.paymentMethod} />
      </div>
    </div>
  );
});

Tooltip.displayName = 'Tooltip';
