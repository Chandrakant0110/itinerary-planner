import { useState } from 'react';
import { DayPlan, Activity, Itinerary } from '../types';

interface UseDragAndDropResult {
  itinerary: Itinerary;
  reorderActivitiesWithinDay: (dayId: string, startIndex: number, endIndex: number) => void;
  moveActivityBetweenDays: (
    sourceActivityId: string, 
    sourceDayId: string, 
    destinationDayId: string, 
    destinationIndex: number
  ) => void;
  reorderDays: (startIndex: number, endIndex: number) => void;
}

export const useDragAndDrop = (initialItinerary: Itinerary): UseDragAndDropResult => {
  const [itinerary, setItinerary] = useState<Itinerary>(initialItinerary);

  const reorderActivitiesWithinDay = (dayId: string, startIndex: number, endIndex: number) => {
    if (startIndex === endIndex) return;

    setItinerary((prevItinerary) => {
      const newItinerary = { ...prevItinerary };
      const dayIndex = newItinerary.days.findIndex(day => day.id === dayId);
      
      if (dayIndex === -1) return prevItinerary;
      
      const newDays = [...newItinerary.days];
      const day = { ...newDays[dayIndex] };
      const newActivities = [...day.activities];
      
      // Remove activity from its current position
      const [removed] = newActivities.splice(startIndex, 1);
      // Insert activity at new position
      newActivities.splice(endIndex, 0, removed);
      
      day.activities = newActivities;
      newDays[dayIndex] = day;
      newItinerary.days = newDays;
      
      return newItinerary;
    });
  };

  const moveActivityBetweenDays = (
    sourceActivityId: string, 
    sourceDayId: string, 
    destinationDayId: string, 
    destinationIndex: number
  ) => {
    if (sourceDayId === destinationDayId) return;

    setItinerary((prevItinerary) => {
      const newItinerary = { ...prevItinerary };
      const sourceDayIndex = newItinerary.days.findIndex(day => day.id === sourceDayId);
      const destDayIndex = newItinerary.days.findIndex(day => day.id === destinationDayId);
      
      if (sourceDayIndex === -1 || destDayIndex === -1) return prevItinerary;
      
      const newDays = [...newItinerary.days];
      
      // Find the activity in the source day
      const sourceDay = { ...newDays[sourceDayIndex] };
      const activityIndex = sourceDay.activities.findIndex(activity => activity.id === sourceActivityId);
      
      if (activityIndex === -1) return prevItinerary;
      
      // Get the activity
      const [activity] = sourceDay.activities.splice(activityIndex, 1);
      
      // Add the activity to the destination day
      const destinationDay = { ...newDays[destDayIndex] };
      destinationDay.activities.splice(destinationIndex, 0, activity);
      
      newDays[sourceDayIndex] = sourceDay;
      newDays[destDayIndex] = destinationDay;
      newItinerary.days = newDays;
      
      return newItinerary;
    });
  };

  const reorderDays = (startIndex: number, endIndex: number) => {
    if (startIndex === endIndex) return;

    setItinerary((prevItinerary) => {
      const newItinerary = { ...prevItinerary };
      const newDays = [...newItinerary.days];
      
      // Remove day from its current position
      const [removed] = newDays.splice(startIndex, 1);
      // Insert day at new position
      newDays.splice(endIndex, 0, removed);
      
      newItinerary.days = newDays;
      
      return newItinerary;
    });
  };

  return { 
    itinerary,
    reorderActivitiesWithinDay,
    moveActivityBetweenDays,
    reorderDays
  };
}; 