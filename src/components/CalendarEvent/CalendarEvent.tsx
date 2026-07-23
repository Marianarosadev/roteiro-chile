import React, { useState } from 'react';
import { Activity } from '../../types/itinerary';
import { useActivityColor } from '../../hooks/useActivityColor';
import { Tooltip } from '../Tooltip/Tooltip';

interface CalendarEventProps {
  activity: Activity;
  top: number;
  height: number;
  isSelected?: boolean;
  isHovered?: boolean;
  onSelect?: (id: string) => void;
  onHover?: (id: string | null) => void;
}

export const CalendarEvent: React.FC<CalendarEventProps> = React.memo(({
  activity,
  top,
  height,
  isSelected = false,
  isHovered = false,
  onSelect,
  onHover,
}) => {
  const categoryInfo = useActivityColor(activity.activityType);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(activity.id);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
    onHover?.(activity.id);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    onHover?.(null);
  };

  const isShort = height < 50;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        top: `${top}px`,
        height: `${height}px`,
      }}
      className={`absolute left-1 right-1 rounded-lg border px-2 py-1.5 cursor-pointer transition-all duration-150 overflow-hidden shadow-sm z-10 ${
        categoryInfo.calendarBg
      } ${categoryInfo.calendarBorder} ${categoryInfo.calendarText} ${
        isSelected || isHovered
          ? 'ring-2 ring-sky-500 shadow-md scale-[1.01] z-30'
          : 'hover:shadow-md hover:z-20'
      } ${activity.completed ? 'opacity-50' : ''}`}
    >
      {/* Category Indicator Accent Strip on Left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
        style={{ backgroundColor: categoryInfo.dotColor }}
      />

      <div className="pl-1.5 h-full flex flex-col justify-between">
        <div>
          {/* Top Line: Time */}
          <div className="flex items-center justify-between text-[10px] font-mono font-bold opacity-80 leading-tight">
            <span>
              {activity.startTime}
              {activity.endTime && ` - ${activity.endTime}`}
            </span>
          </div>

          {/* Activity Title */}
          <p
            className={`font-semibold text-xs leading-tight line-clamp-2 mt-0.5 ${
              isShort ? 'truncate' : ''
            }`}
          >
            {activity.description}
          </p>
        </div>

        {/* Bottom Line: Category / Cost if room */}
        {!isShort && (
          <div className="flex items-center justify-between text-[10px] font-medium opacity-75 mt-1 pt-0.5 border-t border-black/10 dark:border-white/10">
            <span className="truncate">{activity.activityType}</span>
            {activity.amountBRL > 0 && (
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                R${activity.amountBRL}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Floating Tooltip Hover Portal */}
      {showTooltip && (
        <div className="absolute left-full ml-2 top-0 z-50 pointer-events-none hidden md:block">
          <Tooltip activity={activity} />
        </div>
      )}
    </div>
  );
});

CalendarEvent.displayName = 'CalendarEvent';
