import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DayPlan } from '../types';
import { formatDate } from '../utils/dateUtils';
import ActivityItem from './ActivityItem';

interface DayCardProps {
  day: DayPlan;
  index: number;
}

const DayCard: React.FC<DayCardProps> = ({ day, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: day.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Sort activities by start time
  const sortedActivities = [...day.activities].sort((a, b) => {
    const aTime = a.startTime.replace(':', '');
    const bTime = b.startTime.replace(':', '');
    return parseInt(aTime) - parseInt(bTime);
  });

  // Activity IDs for SortableContext
  const activityIds = sortedActivities.map(activity => activity.id);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="day-card"
    >
      <div 
        className="day-header"
        {...attributes}
        {...listeners}
      >
        <div>
          <h2 className="font-bold text-lg">Day {index + 1}</h2>
          <p className="text-sm opacity-90">{formatDate(day.date)}</p>
        </div>
        <div className="activity-count">
          {day.activities.length}
        </div>
      </div>

      <div className="day-content custom-scrollbar">
        {sortedActivities.length === 0 ? (
          <div className="empty-day">
            <p>No activities yet</p>
            <p className="text-sm">Drag activities here</p>
          </div>
        ) : (
          <SortableContext items={activityIds} strategy={verticalListSortingStrategy}>
            {sortedActivities.map((activity) => (
              <ActivityItem 
                key={activity.id} 
                activity={activity} 
              />
            ))}
          </SortableContext>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200 p-2">
        <button className="btn btn-secondary w-full">
          + Add Activity
        </button>
      </div>
    </div>
  );
};

export default DayCard; 