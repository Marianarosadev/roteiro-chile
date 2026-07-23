import { useMemo } from 'react';
import { Activity, ItineraryDay } from '../types/itinerary';
import { calculateTotalCost } from '../utils/calculations';

export function useTotals(days: ItineraryDay[], currentDayActivities: Activity[]) {
  const dayTotals = useMemo(() => {
    return calculateTotalCost(currentDayActivities);
  }, [currentDayActivities]);

  const tripTotals = useMemo(() => {
    const allActivities = days.flatMap((d) => d.activities);
    return calculateTotalCost(allActivities);
  }, [days]);

  return {
    dayTotals,
    tripTotals,
  };
}
