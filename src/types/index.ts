export interface Activity {
  id: string;
  title: string;
  description?: string;
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  location?: string;
  type: ActivityType;
  notes?: string;
}

export enum ActivityType {
  FOOD = "food",
  SIGHTSEEING = "sightseeing",
  TRANSPORTATION = "transportation",
  ACCOMMODATION = "accommodation",
  ENTERTAINMENT = "entertainment",
  OTHER = "other"
}

export interface DayPlan {
  id: string;
  date: string; // Format: "YYYY-MM-DD"
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  title: string;
  description?: string;
  destination: string;
  startDate: string; // Format: "YYYY-MM-DD"
  endDate: string; // Format: "YYYY-MM-DD"
  days: DayPlan[];
} 