import { CategoryInfo } from '../types/itinerary';
import { CATEGORY_MAP, DEFAULT_CATEGORY } from '../constants/categories';
import { normalizeCategory } from './formatters';

export function getActivityCategoryInfo(activityType: string): CategoryInfo {
  const normalized = normalizeCategory(activityType);
  return CATEGORY_MAP[normalized] || DEFAULT_CATEGORY;
}
