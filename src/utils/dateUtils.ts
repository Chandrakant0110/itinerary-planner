// Format date as Day of week, Month Day (e.g., Monday, July 1)
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

// Format time (e.g., 14:30 -> 2:30 PM)
export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${hour}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Calculate duration between two times in minutes
export const calculateDurationInMinutes = (startTime: string, endTime: string): number => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;
  
  return endTotalMinutes - startTotalMinutes;
};

// Format duration (e.g., 90 minutes -> 1h 30m)
export const formatDuration = (minutes: number): string => {
  if (minutes <= 0) return '0m';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  
  return `${hours}h ${remainingMinutes}m`;
};

// Check if two time periods overlap
export const doTimesOverlap = (
  startTime1: string, 
  endTime1: string, 
  startTime2: string, 
  endTime2: string
): boolean => {
  const [startHours1, startMinutes1] = startTime1.split(':').map(Number);
  const [endHours1, endMinutes1] = endTime1.split(':').map(Number);
  const [startHours2, startMinutes2] = startTime2.split(':').map(Number);
  const [endHours2, endMinutes2] = endTime2.split(':').map(Number);
  
  const start1 = startHours1 * 60 + startMinutes1;
  const end1 = endHours1 * 60 + endMinutes1;
  const start2 = startHours2 * 60 + startMinutes2;
  const end2 = endHours2 * 60 + endMinutes2;
  
  return (start1 < end2 && start2 < end1);
}; 