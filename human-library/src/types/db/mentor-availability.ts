import type { Database } from "@/types/database";

export type MentorAvailabilityRow =
  Database["public"]["Tables"]["mentor_availability"]["Row"];
export type MentorAvailabilityInsert =
  Database["public"]["Tables"]["mentor_availability"]["Insert"];
export type MentorAvailabilityUpdate =
  Database["public"]["Tables"]["mentor_availability"]["Update"];
