import type { Review } from "./review";

export interface Availability {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  startTime: string;
  endTime: string;
}

export interface Mentor {
  id: string;
  name: string;
  profileImage: string;
  profession: string;
  yearsExperience: number;
  hourlyRate: number;
  bio: string;
  skills: string[];
  rating: number;
  totalSessions: number;
  availability: Availability[];
  reviews: Review[];
  /** URL slug for routing */
  slug: string;
  /** Category IDs this mentor belongs to */
  categoryIds: string[];
  /** Whether to show on the landing page */
  featured: boolean;
  currency: string;
  location: string;
}
