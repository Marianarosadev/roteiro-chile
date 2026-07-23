import { useState, useMemo, useCallback } from 'react';
import { ITINERARY_DATA } from '../data/itineraryData';
import { Activity, ItineraryDay } from '../types/itinerary';
import { sortActivities } from '../utils/calculations';
import { useSelectedDay } from './useSelectedDay';
import { useTotals } from './useTotals';

export function useItinerary() {
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>(() => {
    // Process initial data: ensure activities are sorted by time
    return ITINERARY_DATA.itinerary.map((day) => ({
      ...day,
      activities: sortActivities(day.activities),
    }));
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredActivityId, setHoveredActivityId] = useState<string | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  const selectedDayHook = useSelectedDay(itineraryDays);
  const { currentDay } = selectedDayHook;

  // Toggle activity completion status
  const toggleActivityCompleted = useCallback((activityId: string) => {
    setItineraryDays((prevDays) =>
      prevDays.map((day) => ({
        ...day,
        activities: day.activities.map((act) =>
          act.id === activityId ? { ...act, completed: !act.completed } : act
        ),
      }))
    );
  }, []);

  // Filtered activities for current timeline day view
  const currentFilteredActivities = useMemo(() => {
    if (!currentDay) return [];
    return currentDay.activities.filter((act) => {
      // Hide completed filter
      if (hideCompleted && act.completed) return false;

      // Category filter
      if (selectedCategory && !act.activityType.toLowerCase().includes(selectedCategory.toLowerCase())) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesDesc = act.description.toLowerCase().includes(query);
        const matchesType = act.activityType.toLowerCase().includes(query);
        const matchesInfo = act.importantInfo?.toLowerCase().includes(query) || false;
        if (!matchesDesc && !matchesType && !matchesInfo) return false;
      }

      return true;
    });
  }, [currentDay, hideCompleted, selectedCategory, searchQuery]);

  const { dayTotals, tripTotals } = useTotals(itineraryDays, currentDay?.activities || []);

  return {
    itineraryDays,
    currentDay,
    currentFilteredActivities,
    selectedCategory,
    setSelectedCategory,
    hideCompleted,
    setHideCompleted,
    searchQuery,
    setSearchQuery,
    hoveredActivityId,
    setHoveredActivityId,
    selectedActivityId,
    setSelectedActivityId,
    toggleActivityCompleted,
    dayTotals,
    tripTotals,
    ...selectedDayHook,
  };
}
