import type { Database } from "@/types/database";
import type { MentorRow } from "@/types/db/mentors";
import type { UserRow } from "@/types/db/users";

export type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];
export type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];
export type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"];

/** Booking with joined mentor and user */
export type BookingWithRelations = BookingRow & {
  mentors: Pick<MentorRow, "id" | "slug" | "name" | "profession" | "profile_image">;
  users: Pick<UserRow, "id" | "name" | "email">;
};
