import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Wallet } from 'lucide-react';
import { ItineraryDay } from '../../types/itinerary';
import { formatDateShort, getWeekDayName } from '../../utils/time';
import { formatCurrency } from '../../utils/formatters';

interface DayHeaderProps {
  currentDay: ItineraryDay;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  totalActivitiesCount: number;
  filteredCount: number;
  dayTotalBRL: number;
  dayTotalCLP: number;
}

export const DayHeader: React.FC<DayHeaderProps> = React.memo(({
  currentDay,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  totalActivitiesCount,
  filteredCount,
  dayTotalBRL,
  dayTotalCLP,
}) => {
  const weekDay = getWeekDayName(currentDay.date);
  const formattedDate = formatDateShort(currentDay.date);

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sm:p-5">
      {/* Top row: Day Navigation & Date */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
            <CalendarIcon className="w-3.5 h-3.5" />
            Dia {currentDay.day} • {weekDay}, {formattedDate}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            ({filteredCount} {filteredCount === 1 ? 'atividade' : 'atividades'})
          </span>
        </div>

        {/* Prev / Next buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`p-1.5 rounded-lg border transition-all ${
              hasPrev
                ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                : 'bg-slate-50 text-slate-300 dark:bg-slate-900 dark:text-slate-700 border-slate-200 dark:border-slate-800 cursor-not-allowed'
            }`}
            title="Dia anterior"
            aria-label="Dia anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`p-1.5 rounded-lg border transition-all ${
              hasNext
                ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                : 'bg-slate-50 text-slate-300 dark:bg-slate-900 dark:text-slate-700 border-slate-200 dark:border-slate-800 cursor-not-allowed'
            }`}
            title="Próximo dia"
            aria-label="Próximo dia"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title & Summary */}
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
        {currentDay.title}
      </h2>
      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
        {currentDay.summary}
      </p>

      {/* Day Cost Summary Bar */}
      {(dayTotalBRL > 0 || dayTotalCLP > 0) && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Wallet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Custo do dia:</span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            {dayTotalBRL > 0 && <span className="text-emerald-700 dark:text-emerald-400">{formatCurrency(dayTotalBRL, 'BRL')}</span>}
            {dayTotalBRL > 0 && dayTotalCLP > 0 && <span className="text-slate-300 dark:text-slate-700">•</span>}
            {dayTotalCLP > 0 && <span className="text-slate-700 dark:text-slate-300">{formatCurrency(dayTotalCLP, 'CLP')}</span>}
          </div>
        </div>
      )}
    </div>
  );
});

DayHeader.displayName = 'DayHeader';
