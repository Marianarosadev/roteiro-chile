import React, { useState, useMemo } from 'react';
import { useItinerary } from './hooks/useItinerary';
import { Navbar, CalendarViewMode } from './components/Navbar/Navbar';
import { Timeline } from './components/Timeline/Timeline';
import { Calendar } from './components/Calendar/Calendar';
import { SettingsModal } from './components/SettingsModal/SettingsModal';
import { DaySelectorModal } from './components/DaySelectorModal/DaySelectorModal';
import { getStartOfWeek } from './utils/time';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const {
    itineraryDays,
    currentDay,
    currentFilteredActivities,
    selectedDayNumber,
    selectDay,
    goToNextDay,
    goToPrevDay,
    hasPrev,
    hasNext,
    selectedCategory,
    setSelectedCategory,
    hideCompleted,
    setHideCompleted,
    searchQuery,
    setSearchQuery,
    selectedActivityId,
    setSelectedActivityId,
    hoveredActivityId,
    setHoveredActivityId,
    toggleActivityCompleted,
    dayTotals,
    tripTotals,
    currentUser,
    setCurrentUser,
  } = useItinerary();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDaySelectorOpen, setIsDaySelectorOpen] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024; // 1024px is the lg breakpoint
    }
    return true;
  });
  const [calendarViewMode, setCalendarViewMode] = useState<CalendarViewMode>('month');

  const filteredCalendarDays = useMemo(() => {
    if (!currentDay) return itineraryDays;

    if (calendarViewMode === 'day') {
      return itineraryDays.filter((day) => day.day === selectedDayNumber);
    }

    if (calendarViewMode === 'week') {
      const selectedDayWeekStart = getStartOfWeek(currentDay.date);
      return itineraryDays.filter((day) => getStartOfWeek(day.date) === selectedDayWeekStart);
    }

    if (calendarViewMode === 'month') {
      const selectedDayMonth = currentDay.date.substring(0, 7); // YYYY-MM
      return itineraryDays.filter((day) => day.date.substring(0, 7) === selectedDayMonth);
    }

    return itineraryDays;
  }, [itineraryDays, currentDay, selectedDayNumber, calendarViewMode]);

  const handleToggleCalendar = () => {
    const nextVisible = !isCalendarVisible;
    if (nextVisible && typeof window !== 'undefined' && window.innerWidth < 1024) {
      setCalendarViewMode('day');
    }
    setIsCalendarVisible(nextVisible);
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans overflow-hidden">
      {/* Top Navbar */}
      <Navbar
        tripTitle="Roteiro Santiago 2026"
        totalBRL={tripTotals.totalBRL}
        totalCLP={tripTotals.totalCLP}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isCalendarVisible={isCalendarVisible}
        onToggleCalendar={handleToggleCalendar}
        calendarViewMode={calendarViewMode}
        onChangeCalendarViewMode={setCalendarViewMode}
        currentUser={currentUser}
        onChangeCurrentUser={setCurrentUser}
      />

      {/* Main Content Area: Timeline (Left) + Calendar (Right) */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Column: Timeline (adaptive width/height depending on calendar visibility) */}
        <section className={`shrink-0 z-10 shadow-md transition-all duration-300 ${
          isCalendarVisible 
            ? 'hidden lg:block lg:w-[35%] h-full' 
            : 'w-full h-full'
        }`}>
          <Timeline
            currentDay={currentDay}
            filteredActivities={currentFilteredActivities}
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPrevDay={goToPrevDay}
            onNextDay={goToNextDay}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            hideCompleted={hideCompleted}
            onToggleHideCompleted={setHideCompleted}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedActivityId={selectedActivityId}
            hoveredActivityId={hoveredActivityId}
            onSelectActivity={setSelectedActivityId}
            onHoverActivity={setHoveredActivityId}
            onToggleCompleted={toggleActivityCompleted}
            dayTotalBRL={dayTotals.totalBRL}
            dayTotalCLP={dayTotals.totalCLP}
            onOpenDaySelector={() => setIsDaySelectorOpen(true)}
          />
        </section>

        {/* Right Column: Calendar (65% Desktop / 100% Mobile) */}
        <AnimatePresence>
          {isCalendarVisible && (
            <motion.section
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute inset-0 lg:relative lg:inset-auto z-20 lg:z-0 w-full lg:w-[65%] h-full flex-1"
            >
              <Calendar
                days={filteredCalendarDays}
                selectedDayNumber={selectedDayNumber}
                selectedActivityId={selectedActivityId}
                hoveredActivityId={hoveredActivityId}
                onSelectDay={selectDay}
                onSelectActivity={setSelectedActivityId}
                onHoverActivity={setHoveredActivityId}
                onClose={() => setIsCalendarVisible(false)}
                viewMode={calendarViewMode}
                onPrevDay={goToPrevDay}
                onNextDay={goToNextDay}
                hasPrev={hasPrev}
                hasNext={hasNext}
                onOpenDaySelector={() => setIsDaySelectorOpen(true)}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        totalBRL={tripTotals.totalBRL}
        totalCLP={tripTotals.totalCLP}
      />

      {/* Day Selector Modal */}
      <DaySelectorModal
        isOpen={isDaySelectorOpen}
        onClose={() => setIsDaySelectorOpen(false)}
        days={itineraryDays}
        selectedDayNumber={selectedDayNumber}
        onSelectDay={selectDay}
      />
    </div>
  );
}
