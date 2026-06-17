export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: string;
  mentorId: string;
  mentorSlug: string;
  mentorName: string;
  menteeId: string;
  menteeName: string;
  menteeEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  topic: string;
  goals: string;
  status: BookingStatus;
  totalPrice: number;
  currency: string;
  createdAt: string;
}
