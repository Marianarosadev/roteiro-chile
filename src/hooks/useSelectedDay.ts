import { useState, useCallback } from 'react';
import { ItineraryDay } from '../types/itinerary';

export function useSelectedDay(days: ItineraryDay[]) {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(days[0]?.day || 1);

  const selectedDayIndex = days.findIndex((d) => d.day === selectedDayNumber);
  const currentDay = days[selectedDayIndex >= 0 ? selectedDayIndex : 0] || days[0];

  const selectDay = useCallback((dayNumber: number) => {
    setSelectedDayNumber(dayNumber);
  }, []);

  const goToNextDay = useCallback(() => {
    if (selectedDayIndex < days.length - 1) {
      setSelectedDayNumber(days[selectedDayIndex + 1].day);
    }
  }, [days, selectedDayIndex]);

  const goToPrevDay = useCallback(() => {
    if (selectedDayIndex > 0) {
      setSelectedDayNumber(days[selectedDayIndex - 1].day);
    }
  }, [days, selectedDayIndex]);

  const hasPrev = selectedDayIndex > 0;
  const hasNext = selectedDayIndex < days.length - 1;

  return {
    selectedDayNumber,
    currentDay,
    selectedDayIndex,
    selectDay,
    goToNextDay,
    goToPrevDay,
    hasPrev,
    hasNext,
  };
}
