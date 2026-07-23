import React from 'react';
import { X, Calendar, MapPin } from 'lucide-react';
import { ItineraryDay } from '../../types/itinerary';
import { formatDateShort, getWeekDayName } from '../../utils/time';

interface DaySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  days: ItineraryDay[];
  selectedDayNumber: number;
  onSelectDay: (dayNumber: number) => void;
}

export const DaySelectorModal: React.FC<DaySelectorModalProps> = React.memo(({
  isOpen,
  onClose,
  days,
  selectedDayNumber,
  onSelectDay,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-none">
                Selecionar Dia do Roteiro
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Escolha qual dia deseja visualizar na timeline e calendário
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Days List */}
        <div className="overflow-y-auto pr-1 space-y-2 flex-1 scrollbar-thin">
          {days.map((day) => {
            const isSelected = day.day === selectedDayNumber;
            const weekDay = getWeekDayName(day.date);
            const formattedDate = formatDateShort(day.date);

            return (
              <button
                key={day.day}
                onClick={() => {
                  onSelectDay(day.day);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-900 dark:text-sky-100 shadow-sm ring-1 ring-sky-500/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      Dia {day.day}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {weekDay}, {formattedDate}
                    </span>
                  </div>
                  <h4 className={`font-bold text-sm mt-1.5 truncate ${
                    isSelected ? 'text-sky-900 dark:text-sky-100' : 'text-slate-900 dark:text-slate-100'
                  }`}>
                    {day.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-medium">
                    {day.summary}
                  </p>
                </div>

                <div className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-colors ${
                  isSelected
                    ? 'border-sky-500 bg-sky-500 text-white'
                    : 'border-slate-300 dark:border-slate-700 text-transparent'
                }`}>
                  <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

DaySelectorModal.displayName = 'DaySelectorModal';
