import React, { useCallback } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Itinerary } from '../types';
import DayCard from './DayCard';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

interface ItineraryBoardProps {
  initialItinerary: Itinerary;
}

const ItineraryBoard: React.FC<ItineraryBoardProps> = ({ initialItinerary }) => {
  const { 
    itinerary, 
    reorderActivitiesWithinDay, 
    moveActivityBetweenDays, 
    reorderDays 
  } = useDragAndDrop(initialItinerary);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [activeParentId, setActiveParentId] = React.useState<string | null>(null);

  const findDayOfActivity = useCallback((activityId: string) => {
    for (const day of itinerary.days) {
      const activity = day.activities.find(a => a.id === activityId);
      if (activity) {
        return day.id;
      }
    }
    return null;
  }, [itinerary.days]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    
    // Check if the dragged item is an activity
    const dayId = findDayOfActivity(active.id as string);
    if (dayId) {
      setActiveParentId(dayId);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Skip if hovering over the same item
    if (activeId === overId) return;

    // Check if we're dragging an activity
    const activeDayId = findDayOfActivity(activeId);
    if (!activeDayId) return;
    
    // Check if we're dragging over a day
    const isOverADay = itinerary.days.some(day => day.id === overId);
    
    if (isOverADay) {
      // If dragging an activity over a day, we'll handle it in dragEnd
      return;
    }
    
    // Check if we're dragging over an activity in a different day
    const overDayId = findDayOfActivity(overId);
    if (!overDayId || activeDayId === overDayId) return;
    
    // Find the index of the activity in the over day
    const overDayIndex = itinerary.days.findIndex(day => day.id === overDayId);
    const overDay = itinerary.days[overDayIndex];
    const overActivityIndex = overDay.activities.findIndex(a => a.id === overId);
    
    // Move the activity to the new day
    moveActivityBetweenDays(activeId, activeDayId, overDayId, overActivityIndex);
    
    // Update the active parent to be the new day
    setActiveParentId(overDayId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      setActiveParentId(null);
      return;
    }
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    if (activeId === overId) {
      setActiveId(null);
      setActiveParentId(null);
      return;
    }
    
    // Check if dragging a day
    const isDayDrag = itinerary.days.some(day => day.id === activeId);
    
    if (isDayDrag) {
      const oldIndex = itinerary.days.findIndex(day => day.id === activeId);
      const newIndex = itinerary.days.findIndex(day => day.id === overId);
      
      if (oldIndex !== newIndex) {
        reorderDays(oldIndex, newIndex);
      }
    } 
    // This is an activity drag
    else {
      const activeDayId = activeParentId;
      
      if (!activeDayId) {
        setActiveId(null);
        setActiveParentId(null);
        return;
      }
      
      // Check if dragging over a day
      const isOverDay = itinerary.days.some(day => day.id === overId);
      
      if (isOverDay) {
        // Find the day
        const dayIndex = itinerary.days.findIndex(day => day.id === overId);
        const day = itinerary.days[dayIndex];
        
        // If it's the same day, don't do anything
        if (activeDayId === overId) {
          setActiveId(null);
          setActiveParentId(null);
          return;
        }
        
        // Move to the end of the new day
        moveActivityBetweenDays(activeId, activeDayId, overId, day.activities.length);
      } 
      // It's an activity - handle reordering within the same day
      else {
        const overDayId = findDayOfActivity(overId);
        
        // If the activity is in the same day
        if (activeDayId === overDayId) {
          const dayIndex = itinerary.days.findIndex(day => day.id === activeDayId);
          const day = itinerary.days[dayIndex];
          
          const oldIndex = day.activities.findIndex(a => a.id === activeId);
          const newIndex = day.activities.findIndex(a => a.id === overId);
          
          reorderActivitiesWithinDay(activeDayId, oldIndex, newIndex);
        }
      }
    }
    
    setActiveId(null);
    setActiveParentId(null);
  };

  // Get all day IDs for sortable context
  const dayIds = itinerary.days.map(day => day.id);

  return (
    <div className="p-4">
      <div className="card mb-6 p-6">
        <h1 className="text-2xl font-bold text-primary mb-2">{itinerary.title}</h1>
        <p className="text-muted mb-4">{itinerary.description}</p>
        
        <div className="flex flex-wrap gap-6 justify-between">
          <div className="flex items-center">
            <span className="text-muted mr-2">Destination:</span>
            <span className="font-semibold">{itinerary.destination}</span>
          </div>
          <div className="flex items-center">
            <span className="text-muted mr-2">Dates:</span>
            <span className="font-semibold">
              {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          <div className="flex min-w-full pb-4">
            <SortableContext items={dayIds} strategy={horizontalListSortingStrategy}>
              {itinerary.days.map((day, index) => (
                <DayCard 
                  key={day.id} 
                  day={day} 
                  index={index} 
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default ItineraryBoard; 