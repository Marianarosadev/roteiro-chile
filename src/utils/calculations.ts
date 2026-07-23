import { Activity } from '../types/itinerary';
import { timeToMinutes } from './time';

export const DEFAULT_PIXELS_PER_MINUTE = 2; // 2px per min = 120px per hour
export const MIN_EVENT_HEIGHT = 40; // minimum height for events without endTime or short duration
export const CALENDAR_START_HOUR = 5; // 05:00
export const CALENDAR_END_HOUR = 23; // 23:00

/**
 * Calculates duration in minutes between startTime and endTime.
 * If endTime is null, returns defaultDurationMin (default 30 min).
 */
export function calculateDuration(
  startTime: string,
  endTime: string | null,
  defaultDurationMin = 30
): number {
  if (!endTime) return defaultDurationMin;
  const startMin = timeToMinutes(startTime);
  let endMin = timeToMinutes(endTime);
  if (endMin < startMin) {
    // Crosses midnight
    endMin += 24 * 60;
  }
  const diff = endMin - startMin;
  return diff > 0 ? diff : defaultDurationMin;
}

/**
 * Calculates event card height in pixels in the calendar.
 */
export function calculateEventHeight(
  startTime: string,
  endTime: string | null,
  pixelsPerMinute = DEFAULT_PIXELS_PER_MINUTE,
  minHeight = MIN_EVENT_HEIGHT
): number {
  const duration = calculateDuration(startTime, endTime, 30);
  const rawHeight = duration * pixelsPerMinute;
  return Math.max(rawHeight, minHeight);
}

/**
 * Calculates top Y position in pixels relative to grid start hour (05:00).
 */
export function calculateEventPosition(
  startTime: string,
  startHourOfDay = CALENDAR_START_HOUR,
  pixelsPerMinute = DEFAULT_PIXELS_PER_MINUTE
): number {
  const startMin = timeToMinutes(startTime);
  const baseMin = startHourOfDay * 60;
  const relativeMin = Math.max(0, startMin - baseMin);
  return relativeMin * pixelsPerMinute;
}

/**
 * Sorts activities chronologically by startTime.
 */
export function sortActivities(activities: Activity[]): Activity[] {
  return [...activities].sort((a, b) => {
    const timeA = timeToMinutes(a.startTime);
    const timeB = timeToMinutes(b.startTime);
    if (timeA !== timeB) return timeA - timeB;
    const endA = a.endTime ? timeToMinutes(a.endTime) : timeA + 30;
    const endB = b.endTime ? timeToMinutes(b.endTime) : timeB + 30;
    return endA - endB;
  });
}

/**
 * Calculates accumulated total costs for a list of activities.
 */
export function calculateTotalCost(activities: Activity[]): { totalBRL: number; totalCLP: number } {
  return activities.reduce(
    (acc, act) => {
      acc.totalBRL += act.amountBRL || 0;
      acc.totalCLP += act.amountCLP || 0;
      return acc;
    },
    { totalBRL: 0, totalCLP: 0 }
  );
}
