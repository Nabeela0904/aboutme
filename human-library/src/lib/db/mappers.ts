import type { Mentor } from "@/types/mentor";
import type { Review } from "@/types/review";
import type { Booking } from "@/types/booking";
import type { Category } from "@/types/category";
import type { MentorWithRelations } from "@/types/db/mentors";
import type { BookingWithRelations } from "@/types/db/bookings";
import type { CategoryRow } from "@/types/db/categories";
import type { ReviewRow } from "@/types/db/reviews";
import type { MentorAvailabilityRow } from "@/types/db/mentor-availability";

export function mapCategoryRow(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
  };
}

export function mapReviewRow(row: ReviewRow): Review {
  return {
    id: row.id,
    authorName: row.author_name,
    rating: row.rating,
    comment: row.comment,
    date: row.created_at.split("T")[0],
  };
}

export function mapAvailabilityRow(row: MentorAvailabilityRow) {
  return {
    day: row.day_of_week,
    startTime: row.start_time.slice(0, 5),
    endTime: row.end_time.slice(0, 5),
  };
}

export function mapMentorRowToMentor(row: MentorWithRelations): Mentor {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    profileImage: row.profile_image,
    profession: row.profession,
    yearsExperience: row.years_experience,
    hourlyRate: Number(row.hourly_rate),
    currency: row.currency,
    bio: row.bio,
    skills: row.skills,
    rating: Number(row.rating),
    totalSessions: row.total_sessions,
    location: row.location,
    featured: row.featured,
    categoryIds: row.mentor_categories.map((mc) => mc.category_id),
    availability: row.mentor_availability.map(mapAvailabilityRow),
    reviews: row.reviews.map(mapReviewRow),
  };
}

export function mapBookingRowToBooking(row: BookingWithRelations): Booking {
  return {
    id: row.id,
    mentorId: row.mentor_id,
    mentorSlug: row.mentors.slug,
    mentorName: row.mentors.name,
    menteeId: row.user_id,
    menteeName: row.users.name,
    menteeEmail: row.users.email,
    date: row.date,
    startTime: row.start_time.slice(0, 5),
    endTime: row.end_time.slice(0, 5),
    durationMinutes: row.duration_minutes,
    topic: row.topic,
    goals: row.goals,
    status: row.status,
    totalPrice: Number(row.total_price),
    currency: row.currency,
    createdAt: row.created_at,
  };
}
