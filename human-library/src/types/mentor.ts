export interface MentorReview {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TimeSlot {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  startTime: string;
  endTime: string;
}

export interface Mentor {
  id: string;
  slug: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  longBio: string;
  avatarSeed: string;
  categories: string[];
  skills: string[];
  languages: string[];
  hourlyRate: number;
  currency: string;
  rating: number;
  reviewCount: number;
  sessionCount: number;
  yearsExperience: number;
  location: string;
  timezone: string;
  featured: boolean;
  availability: TimeSlot[];
  reviews: MentorReview[];
}
