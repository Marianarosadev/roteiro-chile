export interface Activity {
  id: string;
  startTime: string; // HH:mm format
  endTime: string | null; // HH:mm format or null
  description: string;
  amountBRL: number;
  amountCLP: number;
  activityType: string;
  paymentMethod?: string | null;
  importantInfo?: string | null;
  paymentStatus?: string | null;
  completed?: boolean;
}

export interface ItineraryDay {
  day: number;
  date: string; // YYYY-MM-DD
  title: string;
  summary: string;
  activities: Activity[];
}

export interface Itinerary {
  itinerary: ItineraryDay[];
}

export interface CategoryInfo {
  name: string;
  key: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  badgeClass: string;
  calendarBg: string;
  calendarBorder: string;
  calendarText: string;
  dotColor: string;
  iconName: string;
}

export type CurrencyType = 'BRL' | 'CLP';
