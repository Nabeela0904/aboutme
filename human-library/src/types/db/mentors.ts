import type { Database } from "@/types/database";
import type { CategoryRow } from "@/types/db/categories";
import type { MentorAvailabilityRow } from "@/types/db/mentor-availability";
import type { ReviewRow } from "@/types/db/reviews";

export type MentorRow = Database["public"]["Tables"]["mentors"]["Row"];
export type MentorInsert = Database["public"]["Tables"]["mentors"]["Insert"];
export type MentorUpdate = Database["public"]["Tables"]["mentors"]["Update"];

export type MentorCategoryRow = Database["public"]["Tables"]["mentor_categories"]["Row"];

/** Mentor with joined categories, availability, and reviews */
export type MentorWithRelations = MentorRow & {
  mentor_categories: Array<{ category_id: string; categories: CategoryRow }>;
  mentor_availability: MentorAvailabilityRow[];
  reviews: ReviewRow[];
};
