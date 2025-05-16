import { ActivityType, Itinerary } from '../types';

export const mockItinerary: Itinerary = {
  id: "itinerary-1",
  title: "Japan Adventure",
  description: "Exploring the beautiful cities and countryside of Japan",
  destination: "Japan",
  startDate: "2025-07-01",
  endDate: "2025-07-07",
  days: [
    {
      id: "day-1",
      date: "2025-07-01",
      activities: [
        {
          id: "activity-1-1",
          title: "Arrive at Tokyo Narita Airport",
          description: "Flight JL123 arriving at 10:30 AM",
          startTime: "10:30",
          endTime: "11:30",
          location: "Tokyo Narita Airport",
          type: ActivityType.TRANSPORTATION,
          notes: "Collect luggage at Terminal 2, Belt 8"
        },
        {
          id: "activity-1-2",
          title: "Check-in at Hotel",
          description: "Check-in and freshen up",
          startTime: "13:00",
          endTime: "14:00",
          location: "Hotel Gracery Shinjuku",
          type: ActivityType.ACCOMMODATION
        },
        {
          id: "activity-1-3",
          title: "Explore Shinjuku",
          description: "Walk around Shinjuku and visit Shinjuku Gyoen National Garden",
          startTime: "14:30",
          endTime: "17:30",
          location: "Shinjuku",
          type: ActivityType.SIGHTSEEING
        },
        {
          id: "activity-1-4",
          title: "Dinner at Ichiran",
          description: "Famous ramen restaurant",
          startTime: "18:00",
          endTime: "19:30",
          location: "Ichiran Ramen, Shinjuku",
          type: ActivityType.FOOD
        }
      ]
    },
    {
      id: "day-2",
      date: "2025-07-02",
      activities: [
        {
          id: "activity-2-1",
          title: "Breakfast at Hotel",
          startTime: "08:00",
          endTime: "09:00",
          location: "Hotel Gracery Shinjuku",
          type: ActivityType.FOOD
        },
        {
          id: "activity-2-2",
          title: "Visit Tokyo Skytree",
          description: "One of the tallest structures in the world with amazing views",
          startTime: "10:00",
          endTime: "12:00",
          location: "Tokyo Skytree, Sumida",
          type: ActivityType.SIGHTSEEING
        },
        {
          id: "activity-2-3",
          title: "Lunch at Asakusa",
          description: "Traditional Japanese lunch",
          startTime: "12:30",
          endTime: "14:00",
          location: "Asakusa",
          type: ActivityType.FOOD
        },
        {
          id: "activity-2-4",
          title: "Visit Senso-ji Temple",
          description: "Ancient Buddhist temple",
          startTime: "14:30",
          endTime: "16:30",
          location: "Senso-ji Temple, Asakusa",
          type: ActivityType.SIGHTSEEING
        },
        {
          id: "activity-2-5",
          title: "Shopping at Nakamise Street",
          description: "Traditional Japanese souvenirs",
          startTime: "16:30",
          endTime: "18:00",
          location: "Nakamise Street, Asakusa",
          type: ActivityType.ENTERTAINMENT
        }
      ]
    },
    {
      id: "day-3",
      date: "2025-07-03",
      activities: [
        {
          id: "activity-3-1",
          title: "Day Trip to Hakone",
          description: "Hot springs and mountain views",
          startTime: "08:00",
          endTime: "20:00",
          location: "Hakone",
          type: ActivityType.SIGHTSEEING,
          notes: "Take the Romancecar from Shinjuku Station"
        }
      ]
    },
    {
      id: "day-4",
      date: "2025-07-04",
      activities: [
        {
          id: "activity-4-1",
          title: "Visit Meiji Shrine",
          description: "Beautiful shrine in a forest setting",
          startTime: "09:00",
          endTime: "11:00",
          location: "Meiji Shrine, Shibuya",
          type: ActivityType.SIGHTSEEING
        },
        {
          id: "activity-4-2",
          title: "Explore Harajuku",
          description: "Shopping and people watching",
          startTime: "11:30",
          endTime: "14:00",
          location: "Takeshita Street, Harajuku",
          type: ActivityType.ENTERTAINMENT
        },
        {
          id: "activity-4-3",
          title: "Lunch at Harajuku Crepes",
          startTime: "14:00",
          endTime: "15:00",
          location: "Harajuku",
          type: ActivityType.FOOD
        },
        {
          id: "activity-4-4",
          title: "Visit Shibuya Crossing",
          description: "World's busiest pedestrian crossing",
          startTime: "16:00",
          endTime: "17:30",
          location: "Shibuya",
          type: ActivityType.SIGHTSEEING
        }
      ]
    },
    {
      id: "day-5",
      date: "2025-07-05",
      activities: [
        {
          id: "activity-5-1",
          title: "Travel to Kyoto",
          description: "Take the Shinkansen bullet train",
          startTime: "08:00",
          endTime: "11:00",
          location: "Tokyo Station to Kyoto Station",
          type: ActivityType.TRANSPORTATION
        },
        {
          id: "activity-5-2",
          title: "Check-in at Ryokan",
          description: "Traditional Japanese inn",
          startTime: "12:00",
          endTime: "13:00",
          location: "Kyoto Ryokan",
          type: ActivityType.ACCOMMODATION
        },
        {
          id: "activity-5-3",
          title: "Visit Kinkaku-ji (Golden Pavilion)",
          description: "Famous Zen Buddhist Temple",
          startTime: "14:00",
          endTime: "16:00",
          location: "Kinkaku-ji, Kyoto",
          type: ActivityType.SIGHTSEEING
        }
      ]
    },
    {
      id: "day-6",
      date: "2025-07-06",
      activities: [
        {
          id: "activity-6-1",
          title: "Visit Fushimi Inari Shrine",
          description: "Famous for thousands of vermilion torii gates",
          startTime: "09:00",
          endTime: "12:00",
          location: "Fushimi Inari Shrine, Kyoto",
          type: ActivityType.SIGHTSEEING
        },
        {
          id: "activity-6-2",
          title: "Lunch at Local Restaurant",
          description: "Try Kyoto specialty dishes",
          startTime: "12:30",
          endTime: "14:00",
          location: "Kyoto",
          type: ActivityType.FOOD
        },
        {
          id: "activity-6-3",
          title: "Arashiyama Bamboo Grove",
          description: "Walk through the famous bamboo forest",
          startTime: "15:00",
          endTime: "17:00",
          location: "Arashiyama, Kyoto",
          type: ActivityType.SIGHTSEEING
        }
      ]
    },
    {
      id: "day-7",
      date: "2025-07-07",
      activities: [
        {
          id: "activity-7-1",
          title: "Return to Tokyo",
          description: "Take the Shinkansen bullet train",
          startTime: "10:00",
          endTime: "13:00",
          location: "Kyoto Station to Tokyo Station",
          type: ActivityType.TRANSPORTATION
        },
        {
          id: "activity-7-2",
          title: "Last-minute shopping",
          description: "Pick up souvenirs",
          startTime: "14:00",
          endTime: "17:00",
          location: "Tokyo",
          type: ActivityType.ENTERTAINMENT
        },
        {
          id: "activity-7-3",
          title: "Farewell Dinner",
          description: "Japanese BBQ",
          startTime: "18:00",
          endTime: "20:00",
          location: "Shinjuku",
          type: ActivityType.FOOD
        }
      ]
    }
  ]
}; 