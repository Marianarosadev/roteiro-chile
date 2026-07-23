import React from 'react';
import { ItineraryDay } from '../../types/itinerary';
import { CalendarEvent } from '../CalendarEvent/CalendarEvent';
import { getDayOfMonth, getWeekDayName } from '../../utils/time';

interface CalendarColumnProps {
  day: ItineraryDay;
  isSelected: boolean;
  hoursList: number[];
  pixelsPerMinute: number;
  totalGridHeight: number;
  getEventPosition: (startTime: string) => number;
  getEventHeight: (startTime: string, endTime: string | null) => number;
  selectedActivityId: string | null;
  hoveredActivityId: string | null;
  onSelectDay: (dayNumber: number) => void;
  onSelectActivity: (id: string) => void;
  onHoverActivity: (id: string | null) => void;
}

export const CalendarColumn: React.FC<CalendarColumnProps> = React.memo(({
  day,
  isSelected,
  hoursList,
  pixelsPerMinute,
  totalGridHeight,
  getEventPosition,
  getEventHeight,
  selectedActivityId,
  hoveredActivityId,
  onSelectDay,
  onSelectActivity,
  onHoverActivity,
}) => {
  const weekDay = getWeekDayName(day.date);
  const dayNum = getDayOfMonth(day.date) || day.day;
  const hourHeight = 60 * pixelsPerMinute;

  return (
    <div
      onClick={() => onSelectDay(day.day)}
      className={`min-w-[200px] sm:min-w-[220px] flex-1 border-r border-slate-200 dark:border-slate-800 transition-colors relative cursor-pointer ${
        isSelected
          ? 'bg-sky-50/30 dark:bg-sky-950/20'
          : 'bg-white dark:bg-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-800/20'
      }`}
    >
      {/* Sticky Day Column Header */}
      <div
        className={`h-14 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 flex flex-col items-center justify-center transition-colors ${
          isSelected
            ? 'bg-sky-100/90 dark:bg-sky-900/80 border-b-2 border-b-sky-500'
            : 'bg-slate-50 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
      >
        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
          {weekDay}
        </span>
        <div className="flex items-center gap-1">
          <span
            className={`text-base font-bold w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
              isSelected
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {dayNum}
          </span>
        </div>
      </div>

      {/* Column Time Grid Lines */}
      <div className="relative" style={{ height: `${totalGridHeight}px` }}>
        {hoursList.map((hour) => (
          <div
            key={hour}
            style={{ height: `${hourHeight}px` }}
            className="border-b border-slate-100 dark:border-slate-800/40 w-full"
          />
        ))}

        {/* Render Events */}
        {day.activities.map((act) => {
          const top = getEventPosition(act.startTime);
          const height = getEventHeight(act.startTime, act.endTime);

          return (
            <CalendarEvent
              key={act.id}
              activity={act}
              top={top}
              height={height}
              isSelected={selectedActivityId === act.id}
              isHovered={hoveredActivityId === act.id}
              onSelect={(id) => {
                onSelectDay(day.day);
                onSelectActivity(id);
              }}
              onHover={onHoverActivity}
            />
          );
        })}
      </div>
    </div>
  );
});

CalendarColumn.displayName = 'CalendarColumn';
