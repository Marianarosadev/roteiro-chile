import React from 'react';
import { Activity } from '../../types/itinerary';
import { ActivityBadge } from '../ActivityBadge/ActivityBadge';
import { CostBadge } from '../CostBadge/CostBadge';
import { PaymentBadge } from '../PaymentBadge/PaymentBadge';
import { Clock, Info } from 'lucide-react';
import { useActivityColor } from '../../hooks/useActivityColor';

interface TimelineItemProps {
  activity: Activity;
  isLast: boolean;
  isSelected?: boolean;
  isHovered?: boolean;
  onSelect?: (activityId: string) => void;
  onHover?: (activityId: string | null) => void;
  onToggleCompleted?: (activityId: string) => void;
}

export const TimelineItem: React.FC<TimelineItemProps> = React.memo(({
  activity,
  isLast,
  isSelected = false,
  isHovered = false,
  onSelect,
  onHover,
  onToggleCompleted,
}) => {
  const categoryInfo = useActivityColor(activity.activityType);

  return (
    <div
      className={`relative pl-8 sm:pl-10 pb-6 group cursor-pointer transition-all ${
        activity.completed ? 'opacity-60' : ''
      }`}
      onClick={() => onSelect?.(activity.id)}
      onMouseEnter={() => onHover?.(activity.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      {/* Continuous Vertical Timeline Connecting Line */}
      {!isLast && (
        <div className="absolute left-3.5 sm:left-4 top-4 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700/80 group-hover:bg-sky-400 transition-colors" />
      )}

      {/* Node Bullet Circle */}
      <div
        className={`absolute left-1.5 sm:left-2 top-2.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all duration-200 z-10 ${
          isSelected || isHovered
            ? 'border-sky-600 bg-sky-500 text-white scale-110 shadow-md ring-4 ring-sky-100 dark:ring-sky-950/60'
            : activity.completed
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-400 group-hover:border-sky-500'
        }`}
        style={{ borderColor: isSelected || isHovered ? undefined : categoryInfo.dotColor }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
      </div>

      {/* Activity Card Container */}
      <div
        className={`p-4 rounded-xl border transition-all duration-200 shadow-sm ${
          isSelected || isHovered
            ? 'bg-sky-50/80 dark:bg-sky-950/40 border-sky-300 dark:border-sky-700 shadow-md transform translate-x-1'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow'
        }`}
      >
        {/* Header: Time & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="inline-flex items-center gap-1 font-mono text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-900 dark:text-slate-100 font-bold border border-slate-200 dark:border-slate-700">
              <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              {activity.startTime}
              {activity.endTime && <span className="font-normal text-slate-900 dark:text-slate-100"> - {activity.endTime}</span>}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ActivityBadge activityType={activity.activityType} />
          </div>
        </div>

        {/* Activity Description */}
        <h3
          className={`font-semibold text-sm text-slate-900 dark:text-slate-100 leading-snug mb-2.5 ${
            activity.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
          }`}
        >
          {activity.description}
        </h3>

        {/* Important Info Alert Box (if present) */}
        {activity.importantInfo && (
          <div className="flex items-start gap-2 p-2.5 mb-3 bg-amber-50/90 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200/80 dark:border-amber-800/60 rounded-lg text-xs leading-relaxed">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block text-[11px] text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-0.5">
                Informação Importante
              </span>
              <span>{activity.importantInfo}</span>
            </div>
          </div>
        )}

        {/* Card Footer: Costs & Payment Details (only render when there are badges to show) */}
        {(activity.amountBRL > 0 || activity.amountCLP > 0 || activity.paymentStatus || activity.paymentMethod) && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <CostBadge amountBRL={activity.amountBRL} amountCLP={activity.amountCLP} />
            <PaymentBadge paymentStatus={activity.paymentStatus} paymentMethod={activity.paymentMethod} />
          </div>
        )}
      </div>
    </div>
  );
});

TimelineItem.displayName = 'TimelineItem';
