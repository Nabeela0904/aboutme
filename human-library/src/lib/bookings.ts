import type { BookingInput } from "@/lib/validations";
import type { Booking, Mentor, User } from "@/types";

const BOOKINGS_KEY = "hl_bookings";

function readBookings(): Booking[] {
  if (typeof window === "undefined") return getSeedBookings();
  const raw = localStorage.getItem(BOOKINGS_KEY);
  if (!raw) {
    const seed = getSeedBookings();
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(raw) as Booking[];
}

function writeBookings(bookings: Booking[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

function getSeedBookings(): Booking[] {
  return [
    {
      id: "b1",
      mentorId: "m1",
      mentorSlug: "sarah-okafor",
      mentorName: "Sarah Okafor",
      menteeId: "u-demo-1",
      menteeName: "Alex Johnson",
      menteeEmail: "alex@example.com",
      date: "2026-06-20",
      startTime: "10:00",
      endTime: "11:00",
      durationMinutes: 60,
      topic: "Promotion Strategy",
      goals: "Prepare for senior engineer promotion review in Q3",
      status: "confirmed",
      totalPrice: 150,
      currency: "USD",
      createdAt: "2026-06-10T14:30:00Z",
    },
    {
      id: "b2",
      mentorId: "m2",
      mentorSlug: "david-kim",
      mentorName: "David Kim",
      menteeId: "u-demo-2",
      menteeName: "Sam Rivera",
      menteeEmail: "sam@example.com",
      date: "2026-06-22",
      startTime: "09:00",
      endTime: "10:30",
      durationMinutes: 90,
      topic: "Seed Fundraising",
      goals: "Review pitch deck and practice investor Q&A for pre-seed round",
      status: "pending",
      totalPrice: 300,
      currency: "USD",
      createdAt: "2026-06-12T09:15:00Z",
    },
    {
      id: "b3",
      mentorId: "m5",
      mentorSlug: "amara-diallo",
      mentorName: "Amara Diallo",
      menteeId: "u-demo-3",
      menteeName: "Jordan Lee",
      menteeEmail: "jordan@example.com",
      date: "2026-06-15",
      startTime: "14:00",
      endTime: "15:00",
      durationMinutes: 60,
      topic: "Growth Audit",
      goals: "Analyze current marketing funnel and identify quick wins",
      status: "completed",
      totalPrice: 120,
      currency: "USD",
      createdAt: "2026-06-01T11:00:00Z",
    },
  ];
}

export function getAllBookings(): Booking[] {
  return readBookings();
}

export function getBookingsByMentee(menteeId: string): Booking[] {
  return readBookings().filter((b) => b.menteeId === menteeId);
}

export function createBooking(
  input: BookingInput,
  mentor: Mentor,
  user: User
): Booking {
  const duration = input.durationMinutes;
  const [hours, minutes] = input.startTime.split(":").map(Number);
  const endMinutes = hours * 60 + minutes + duration;
  const endHours = Math.floor(endMinutes / 60);
  const endMins = endMinutes % 60;
  const endTime = `${String(endHours).padStart(2, "0")}:${String(endMins).padStart(2, "0")}`;

  const totalPrice = (mentor.hourlyRate * duration) / 60;

  const booking: Booking = {
    id: `b-${Date.now()}`,
    mentorId: mentor.id,
    mentorSlug: mentor.slug,
    mentorName: mentor.name,
    menteeId: user.id,
    menteeName: user.name,
    menteeEmail: user.email,
    date: input.date,
    startTime: input.startTime,
    endTime,
    durationMinutes: duration,
    topic: input.topic,
    goals: input.goals,
    status: "pending",
    totalPrice,
    currency: mentor.currency,
    createdAt: new Date().toISOString(),
  };

  const bookings = readBookings();
  bookings.unshift(booking);
  writeBookings(bookings);
  return booking;
}

export function updateBookingStatus(
  bookingId: string,
  status: Booking["status"]
): Booking | undefined {
  const bookings = readBookings();
  const index = bookings.findIndex((b) => b.id === bookingId);
  if (index === -1) return undefined;
  bookings[index] = { ...bookings[index], status };
  writeBookings(bookings);
  return bookings[index];
}

export function getBookingStats() {
  const bookings = readBookings();
  return {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    revenue: bookings
      .filter((b) => b.status === "completed" || b.status === "confirmed")
      .reduce((sum, b) => sum + b.totalPrice, 0),
  };
}
