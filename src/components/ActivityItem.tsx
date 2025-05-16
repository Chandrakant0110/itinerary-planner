import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Activity, ActivityType } from '../types';
import { formatTime, formatDuration, calculateDurationInMinutes } from '../utils/dateUtils';

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Get the activity type color class
  const getActivityTypeColorClass = (type: ActivityType): string => {
    switch (type) {
      case ActivityType.FOOD:
        return 'bg-food';
      case ActivityType.SIGHTSEEING:
        return 'bg-sightseeing';
      case ActivityType.TRANSPORTATION:
        return 'bg-transportation';
      case ActivityType.ACCOMMODATION:
        return 'bg-accommodation';
      case ActivityType.ENTERTAINMENT:
        return 'bg-entertainment';
      default:
        return 'bg-other';
    }
  };

  // Get the activity icon
  const getActivityTypeIcon = (type: ActivityType): string => {
    switch (type) {
      case ActivityType.FOOD:
        return '🍴';
      case ActivityType.SIGHTSEEING:
        return '🏞️';
      case ActivityType.TRANSPORTATION:
        return '🚅';
      case ActivityType.ACCOMMODATION:
        return '🏨';
      case ActivityType.ENTERTAINMENT:
        return '🎭';
      default:
        return '📝';
    }
  };

  const duration = calculateDurationInMinutes(activity.startTime, activity.endTime);
  const formattedDuration = formatDuration(duration);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card activity-item"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start">
        <div className={`activity-icon ${getActivityTypeColorClass(activity.type)}`}>
          <span role="img" aria-label={activity.type}>
            {getActivityTypeIcon(activity.type)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{activity.title}</h3>
          {activity.description && (
            <p className="text-sm text-muted mt-1">{activity.description}</p>
          )}
          <div className="flex items-center mt-2 text-sm">
            <span className="activity-time">
              {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
            </span>
            <span className="text-muted">({formattedDuration})</span>
          </div>
          {activity.location && (
            <div className="flex items-center mt-2 text-sm">
              <span className="text-muted">📍 {activity.location}</span>
            </div>
          )}
          {activity.notes && (
            <div className="mt-2 p-2 bg-gray-50 text-sm rounded-md">
              <span className="text-muted">{activity.notes}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem; 