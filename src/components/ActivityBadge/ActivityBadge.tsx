import React from 'react';
import { useActivityColor } from '../../hooks/useActivityColor';
import * as Icons from 'lucide-react';

interface ActivityBadgeProps {
  activityType: string;
}

export const ActivityBadge: React.FC<ActivityBadgeProps> = React.memo(({ activityType }) => {
  const categoryInfo = useActivityColor(activityType);

  // Dynamically resolve icon from lucide-react
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[categoryInfo.iconName] || Icons.Tag;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-md border ${categoryInfo.badgeClass}`}
    >
      <IconComponent className="w-3.5 h-3.5 shrink-0" />
      <span>{activityType}</span>
    </span>
  );
});

ActivityBadge.displayName = 'ActivityBadge';
