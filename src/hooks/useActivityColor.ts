import { useMemo } from 'react';
import { getActivityCategoryInfo } from '../utils/activityColor';

export function useActivityColor(activityType: string) {
  return useMemo(() => getActivityCategoryInfo(activityType), [activityType]);
}
