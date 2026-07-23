import React, { useEffect, useState } from 'react';
import { ItineraryDay } from '../../types/itinerary';
import { HourGrid } from '../HourGrid/HourGrid';
import { CalendarColumn } from '../CalendarColumn/CalendarColumn';
import { useCalendarLayout } from '../../hooks/useCalendarLayout';
import { Calendar as CalendarIcon, Info, X } from 'lucide-react';
import { timeToMinutes, getMonthGrid } from '../../utils/time';

interface CalendarProps {
  days: ItineraryDay[];
  selectedDayNumber: number;
  selectedActivityId: string | null;
  hoveredActivityId: string | null;
  onSelectDay: (dayNumber: number) => void;
  onSelectActivity: (id: string) => void;
  onHoverActivity: (id: string | null) => void;
  onClose?: () => void;
  viewMode?: 'day' | 'week' | 'month';
}

export const Calendar: React.FC<CalendarProps> = React.memo(({
  days,
  selectedDayNumber,
  selectedActivityId,
  hoveredActivityId,
  onSelectDay,
  onSelectActivity,
  onHoverActivity,
  onClose,
  viewMode = 'month',
}) => {
  const {
    hoursList,
    pixelsPerMinute,
    totalGridHeight,
    getEventPosition,
    getEventHeight,
    startHour,
  } = useCalendarLayout(4.5); // 4.5px per minute scale

  // Current time line calculation if today corresponds to trip dates
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState<number | null>(null);

  useEffect(() => {
    const updateNow = () => {
      const now = new Date();
      const mins = now.getHours() * 60 + now.getMinutes();
      setCurrentTimeMinutes(mins);
    };
    updateNow();
    const interval = setInterval(updateNow, 60000);
    return () => clearInterval(interval);
  }, []);

  const nowLineTop =
    currentTimeMinutes !== null
      ? (currentTimeMinutes - startHour * 60) * pixelsPerMinute
      : null;

  const referenceDay = days.find(d => d.day === selectedDayNumber) || days[0];
  const refDate = referenceDay ? new Date(`${referenceDay.date}T12:00:00`) : new Date('2026-08-16T12:00:00');
  const year = refDate.getFullYear();
  const month = refDate.getMonth() + 1;
  const weeks = getMonthGrid(year, month, days);

  const getMonthName = (m: number): string => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[m - 1] || '';
  };
  const monthName = getMonthName(month);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 overflow-hidden">

      {/* Main Area: Render columns or month grid */}
      {viewMode === 'month' ? (
        <div className="flex-1 flex flex-col p-4 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/45 scrollbar-thin">
          {/* Days of Week Header Row */}
          <div className="grid grid-cols-7 gap-1.5 mb-2 text-center font-semibold text-xs text-slate-500 dark:text-slate-400 sticky top-0 bg-slate-50 dark:bg-slate-950/95 py-2 -mt-4 -mx-4 px-4 z-20 border-b border-slate-200 dark:border-slate-800/80">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((wkDay) => (
              <div key={wkDay} className="uppercase tracking-wider text-[11px]">
                {wkDay}
              </div>
            ))}
          </div>

          {/* Grid Cells */}
          <div className="grid grid-cols-7 gap-1.5 flex-1 min-h-[300px]">
            {weeks.map((week, weekIdx) =>
              week.map((cell, cellIdx) => {
                const isSelected = cell.itineraryDay && selectedDayNumber === cell.itineraryDay.day;
                return (
                  <div
                    key={`${weekIdx}-${cellIdx}`}
                    onClick={() => cell.itineraryDay && onSelectDay(cell.itineraryDay.day)}
                    className={`min-h-[75px] sm:min-h-[90px] p-2 rounded-lg border flex flex-col justify-between transition-all duration-200 ${
                      cell.itineraryDay
                        ? isSelected
                          ? 'bg-sky-100/90 dark:bg-sky-950/80 border-sky-500 dark:border-sky-500 shadow-md ring-2 ring-sky-500/25 cursor-pointer z-10 scale-[1.01]'
                          : 'bg-white dark:bg-slate-900 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 border-sky-200 dark:border-sky-800 shadow-sm cursor-pointer'
                        : cell.isCurrentMonth
                        ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800/40 text-slate-400 dark:text-slate-600'
                        : 'bg-slate-100/20 dark:bg-slate-900/10 border-slate-100/50 dark:border-slate-800/20 text-slate-300 dark:text-slate-700'
                    }`}
                  >
                    {/* Cell Top: Day number */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${
                          cell.itineraryDay
                            ? isSelected
                              ? 'bg-sky-600 text-white shadow-sm'
                              : 'bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-300 font-semibold'
                            : ''
                        }`}
                      >
                        {cell.dayOfMonth}
                      </span>
                      {cell.itineraryDay && (
                        <span className="text-[9px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-tight">
                          Dia {cell.itineraryDay.day}
                        </span>
                      )}
                    </div>

                    {/* Cell Bottom: Day Title */}
                    {cell.itineraryDay ? (
                      <div className="mt-1 flex-1 flex flex-col justify-end">
                        <p className="text-[10px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">
                          {cell.itineraryDay.title}
                        </p>
                      </div>
                    ) : (
                      <div className="flex-1" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        /* Main Grid Area with Horizontal Scroll for Columns */
        <div className="flex-1 overflow-x-auto overflow-y-auto flex relative scrollbar-thin">
          {/* Left Hour Ruler */}
          <HourGrid hoursList={hoursList} pixelsPerMinute={pixelsPerMinute} />

          {/* Day Columns Container */}
          <div className="flex flex-1 min-w-max relative">
            {days.map((day) => (
              <CalendarColumn
                key={day.day}
                day={day}
                isSelected={selectedDayNumber === day.day}
                hoursList={hoursList}
                pixelsPerMinute={pixelsPerMinute}
                totalGridHeight={totalGridHeight}
                getEventPosition={getEventPosition}
                getEventHeight={getEventHeight}
                selectedActivityId={selectedActivityId}
                hoveredActivityId={hoveredActivityId}
                onSelectDay={onSelectDay}
                onSelectActivity={onSelectActivity}
                onHoverActivity={onHoverActivity}
              />
            ))}

            {/* Current Time Indicator Line (if applicable) */}
            {nowLineTop !== null && nowLineTop >= 0 && nowLineTop <= totalGridHeight && (
              <div
                style={{ top: `${nowLineTop + 56}px` }} // +56px for header offset
                className="absolute left-0 right-0 z-30 pointer-events-none flex items-center"
              >
                <div className="w-3 h-3 rounded-full bg-red-500 -ml-1.5 shadow-sm" />
                <div className="h-0.5 bg-red-500 w-full" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

Calendar.displayName = 'Calendar';
