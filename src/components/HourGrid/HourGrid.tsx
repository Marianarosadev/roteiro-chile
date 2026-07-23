import React from 'react';

interface HourGridProps {
  hoursList: number[];
  pixelsPerMinute: number;
}

export const HourGrid: React.FC<HourGridProps> = React.memo(({ hoursList, pixelsPerMinute }) => {
  const hourHeight = 60 * pixelsPerMinute;

  return (
    <div className="w-14 sm:w-16 shrink-0 border-r border-slate-200 dark:border-slate-800 select-none bg-slate-50/50 dark:bg-slate-950/50">
      {/* Header spacer to align with day column headers */}
      <div className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-20" />

      {/* Hour Labels */}
      <div className="relative">
        {hoursList.map((hour) => (
          <div
            key={hour}
            style={{ height: `${hourHeight}px` }}
            className="relative border-b border-slate-100 dark:border-slate-800/50 pr-2 pt-1 text-right"
          >
            <span className="text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500">
              {String(hour).padStart(2, '0')}:00
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

HourGrid.displayName = 'HourGrid';
