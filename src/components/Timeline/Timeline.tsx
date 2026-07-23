import React from 'react';
import { Activity, ItineraryDay } from '../../types/itinerary';
import { DayHeader } from '../DayHeader/DayHeader';
import { TimelineItem } from '../TimelineItem/TimelineItem';
import { Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TimelineProps {
  currentDay: ItineraryDay;
  filteredActivities: Activity[];
  hasPrev: boolean;
  hasNext: boolean;
  onPrevDay: () => void;
  onNextDay: () => void;
  selectedCategory?: string | null;
  onSelectCategory?: (category: string | null) => void;
  hideCompleted?: boolean;
  onToggleHideCompleted?: (hide: boolean) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedActivityId: string | null;
  hoveredActivityId: string | null;
  onSelectActivity: (id: string) => void;
  onHoverActivity: (id: string | null) => void;
  onToggleCompleted: (id: string) => void;
  dayTotalBRL: number;
  dayTotalCLP: number;
  onOpenDaySelector?: () => void;
}

export const Timeline: React.FC<TimelineProps> = React.memo(({
  currentDay,
  filteredActivities,
  hasPrev,
  hasNext,
  onPrevDay,
  onNextDay,
  selectedActivityId,
  hoveredActivityId,
  onSelectActivity,
  onHoverActivity,
  onToggleCompleted,
  dayTotalBRL,
  dayTotalCLP,
  onOpenDaySelector,
}) => {
  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Day Header with Navigation */}
      <DayHeader
        currentDay={currentDay}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={onPrevDay}
        onNext={onNextDay}
        totalActivitiesCount={currentDay.activities.length}
        filteredCount={filteredActivities.length}
        dayTotalBRL={dayTotalBRL}
        dayTotalCLP={dayTotalCLP}
        onOpenDaySelector={onOpenDaySelector}
      />

      {/* Timeline Activities List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay.day}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.2 }}
            className="space-y-1"
          >
            {filteredActivities.length === 0 ? (
              <div className="py-12 text-center text-slate-400 dark:text-slate-500">
                <Filter className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">Nenhuma atividade encontrada</p>
                <p className="text-xs mt-1">Tente remover os filtros ou pesquisar outro termo.</p>
              </div>
            ) : (
              filteredActivities.map((act, index) => (
                <TimelineItem
                  key={act.id}
                  activity={act}
                  isLast={index === filteredActivities.length - 1}
                  isSelected={selectedActivityId === act.id}
                  isHovered={hoveredActivityId === act.id}
                  onSelect={onSelectActivity}
                  onHover={onHoverActivity}
                  onToggleCompleted={onToggleCompleted}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

Timeline.displayName = 'Timeline';
