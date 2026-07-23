import { ItineraryDay } from '../types/itinerary';

/**
  * Converts "HH:mm" time string into total minutes from start of day (00:00).
 */
export function timeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return 0;
  return hours * 60 + minutes;
}

/**
 * Converts total minutes from start of day into "HH:mm" string.
 */
export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = Math.floor(minutes % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Converts minutes duration to pixels based on scale factor.
 */
export function minutesToPixels(minutes: number, pixelsPerMinute = 2): number {
  return minutes * pixelsPerMinute;
}

/**
 * Formats YYYY-MM-DD into short date representation e.g. "16/08"
 */
export function formatDateShort(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}`;
  }
  return dateStr;
}

/**
 * Returns day number from YYYY-MM-DD e.g. "16"
 */
export function getDayOfMonth(dateStr: string): number {
  if (!dateStr) return 0;
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return parseInt(parts[2], 10);
  }
  return 0;
}

/**
 * Gets abbreviated weekday name in Portuguese.
 */
export function getWeekDayName(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(`${dateStr}T12:00:00`);
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  return days[date.getDay()] || '';
}

/**
 * Returns the start of the week (Sunday) as YYYY-MM-DD for a given date YYYY-MM-DD.
 */
export function getStartOfWeek(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(`${dateStr}T12:00:00`);
  const day = date.getDay();
  const diff = date.getDate() - day;
  const startOfWeek = new Date(date.setDate(diff));
  const yyyy = startOfWeek.getFullYear();
  const mm = String(startOfWeek.getMonth() + 1).padStart(2, '0');
  const dd = String(startOfWeek.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export interface MonthGridCell {
  date: Date;
  dateString: string;
  isCurrentMonth: boolean;
  dayOfMonth: number;
  itineraryDay?: ItineraryDay;
}

/**
 * Generates a 6-week grid layout (42 cells) for a given year and month (1-indexed).
 */
export function getMonthGrid(year: number, month: number, itineraryDays: ItineraryDay[]): MonthGridCell[][] {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday

  // Total days in this month
  const totalDays = new Date(year, month, 0).getDate();

  // Total days in previous month
  const prevMonthTotalDays = new Date(year, month - 1, 0).getDate();

  const cells: MonthGridCell[] = [];

  // 1. Padding days from previous month
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthTotalDays - i;
    const prevDate = new Date(year, month - 2, day);
    const dateString = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(prevDate.getDate()).padStart(2, '0')}`;
    cells.push({
      date: prevDate,
      dateString,
      isCurrentMonth: false,
      dayOfMonth: day,
    });
  }

  // 2. Days of current month
  for (let day = 1; day <= totalDays; day++) {
    const currentDate = new Date(year, month - 1, day);
    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const itineraryDay = itineraryDays.find((d) => d.date === dateString);
    cells.push({
      date: currentDate,
      dateString,
      isCurrentMonth: true,
      dayOfMonth: day,
      itineraryDay,
    });
  }

  // 3. Padding days from next month to complete 6 weeks (42 cells)
  const totalCellsNeeded = 42;
  const nextMonthPaddingCount = totalCellsNeeded - cells.length;
  for (let day = 1; day <= nextMonthPaddingCount; day++) {
    const nextDate = new Date(year, month, day);
    const dateString = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(nextDate.getDate()).padStart(2, '0')}`;
    cells.push({
      date: nextDate,
      dateString,
      isCurrentMonth: false,
      dayOfMonth: day,
    });
  }

  // Group cells into weeks (7 cells each)
  const weeks: MonthGridCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return weeks;
}

