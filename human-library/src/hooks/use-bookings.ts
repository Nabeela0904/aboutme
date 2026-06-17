"use client";

import { useCallback, useEffect, useState } from "react";
import type { Booking } from "@/types";
import {
  createBooking as createBookingLib,
  getAllBookings,
  updateBookingStatus,
} from "@/lib/bookings";
import type { BookingInput } from "@/lib/validations";
import type { Mentor, User } from "@/types";

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setBookings(getAllBookings());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createBooking = useCallback(
    (input: BookingInput, mentor: Mentor, user: User) => {
      const booking = createBookingLib(input, mentor, user);
      refresh();
      return booking;
    },
    [refresh]
  );

  const updateStatus = useCallback(
    (bookingId: string, status: Booking["status"]) => {
      const updated = updateBookingStatus(bookingId, status);
      refresh();
      return updated;
    },
    [refresh]
  );

  return { bookings, isLoading, createBooking, updateStatus, refresh };
}
