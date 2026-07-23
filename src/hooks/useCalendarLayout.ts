import { useMemo, useCallback } from 'react';
import {
  CALENDAR_START_HOUR,
  CALENDAR_END_HOUR,
  DEFAULT_PIXELS_PER_MINUTE,
  MIN_EVENT_HEIGHT,
  calculateEventHeight,
  calculateEventPosition,
} from '../utils/calculations';

export function useCalendarLayout(pixelsPerMinute = DEFAULT_PIXELS_PER_MINUTE) {
  const startHour = CALENDAR_START_HOUR;
  const endHour = CALENDAR_END_HOUR;

  const hoursList = useMemo(() => {
    const list: number[] = [];
    for (let h = startHour; h <= endHour; h++) {
      list.push(h);
    }
    return list;
  }, [startHour, endHour]);

  const totalGridHeight = useMemo(() => {
    const totalMinutes = (endHour - startHour + 1) * 60;
    return totalMinutes * pixelsPerMinute;
  }, [startHour, endHour, pixelsPerMinute]);

  const getEventPosition = useCallback(
    (startTime: string) => calculateEventPosition(startTime, startHour, pixelsPerMinute),
    [startHour, pixelsPerMinute]
  );

  const getEventHeight = useCallback(
    (startTime: string, endTime: string | null) =>
      calculateEventHeight(startTime, endTime, pixelsPerMinute, MIN_EVENT_HEIGHT),
    [pixelsPerMinute]
  );

  return {
    startHour,
    endHour,
    pixelsPerMinute,
    hoursList,
    totalGridHeight,
    getEventPosition,
    getEventHeight,
  };
}
