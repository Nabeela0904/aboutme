"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import type { Mentor } from "@/types";
import { bookingSchema, type BookingInput } from "@/lib/validations";
import { formatPrice } from "@/lib/mentors";
import { useAuth } from "@/hooks/use-auth";
import { useBookings } from "@/hooks/use-bookings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BookingWizardProps {
  mentor: Mentor;
}

function getAvailableDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

function getTimeSlotsForDate(mentor: Mentor, dateStr: string): string[] {
  const date = new Date(dateStr + "T12:00:00");
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
  const dayName = dayNames[date.getDay()];
  const daySlots = mentor.availability.filter((s) => s.day === dayName);
  if (daySlots.length === 0) return [];

  const times: string[] = [];
  for (const slot of daySlots) {
    const [startH, startM] = slot.startTime.split(":").map(Number);
    const [endH, endM] = slot.endTime.split(":").map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    for (let m = startMinutes; m < endMinutes; m += 30) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      times.push(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
    }
  }
  return times;
}

export function BookingWizard({ mentor }: BookingWizardProps) {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { createBooking } = useBookings();
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { durationMinutes: 60 },
  });

  const selectedDate = watch("date");
  const duration = watch("durationMinutes");
  const availableDates = getAvailableDates().filter(
    (d) => getTimeSlotsForDate(mentor, d).length > 0
  );
  const timeSlots = selectedDate ? getTimeSlotsForDate(mentor, selectedDate) : [];
  const totalPrice = (mentor.hourlyRate * Number(duration || 60)) / 60;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=/booking/${mentor.slug}`);
    }
  }, [authLoading, user, router, mentor.slug]);

  function onSubmit(data: BookingInput) {
    if (!user) return;
    const booking = createBooking(data, mentor, user);
    setBookingId(booking.id);
    setConfirmed(true);
  }

  if (authLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  if (confirmed) {
    return (
      <Card className="mx-auto max-w-lg text-center">
        <CardContent className="pt-10 pb-10">
          <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-4 text-2xl font-bold">Booking confirmed!</h2>
          <p className="mt-2 text-muted-foreground">
            Your session with {mentor.name} has been submitted. You&apos;ll receive a
            confirmation email at {user.email}.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Booking ID: {bookingId}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" render={<Link href={`/mentors/${mentor.slug}`} />}>
              Back to profile
            </Button>
            <Button render={<Link href="/mentors" />}>Browse more mentors</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        render={<Link href={`/mentors/${mentor.slug}`} />}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to profile
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Book a session</CardTitle>
              <CardDescription>
                Fill in the details below to schedule your mentorship session.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Select
                    value={selectedDate}
                    onValueChange={(v) => {
                      setValue("date", v ?? "");
                      setValue("startTime", "");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a date" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDates.map((d) => (
                        <SelectItem key={d} value={d}>
                          {new Date(d + "T12:00:00").toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.date && (
                    <p className="text-sm text-destructive">{errors.date.message}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start time</Label>
                    <Select
                      value={watch("startTime")}
                      onValueChange={(v) => setValue("startTime", v ?? "")}
                      disabled={!selectedDate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.startTime && (
                      <p className="text-sm text-destructive">{errors.startTime.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select
                      value={String(duration)}
                      onValueChange={(v) => setValue("durationMinutes", Number(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Session topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g. Career transition strategy"
                    {...register("topic")}
                  />
                  {errors.topic && (
                    <p className="text-sm text-destructive">{errors.topic.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">What do you want to achieve?</Label>
                  <Textarea
                    id="goals"
                    rows={4}
                    placeholder="Describe your goals for this session so your mentor can prepare..."
                    {...register("goals")}
                  />
                  {errors.goals && (
                    <p className="text-sm text-destructive">{errors.goals.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Booking..." : "Confirm booking"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Image
                  src={mentor.profileImage}
                  alt={mentor.name}
                  width={48}
                  height={48}
                  unoptimized
                  className="rounded-full"
                />
                <div>
                  <CardTitle className="text-base">{mentor.name}</CardTitle>
                  <CardDescription>{mentor.profession}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rate</span>
                <span>{formatPrice(mentor.hourlyRate, mentor.currency)}/hr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span>{duration || 60} min</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(totalPrice, mentor.currency)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
