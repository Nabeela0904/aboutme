"use client";

import { Users, Calendar, DollarSign, Clock } from "lucide-react";
import { getAllMentors } from "@/lib/mentors";
import { useBookings } from "@/hooks/use-bookings";
import { formatPrice } from "@/lib/mentors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardStats() {
  const { bookings } = useBookings();
  const mentors = getAllMentors();

  const revenue = bookings
    .filter((b) => b.status === "completed" || b.status === "confirmed")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const pending = bookings.filter((b) => b.status === "pending").length;

  const stats = [
    {
      label: "Total mentors",
      value: mentors.length.toString(),
      icon: Users,
      description: `${mentors.filter((m) => m.featured).length} featured`,
    },
    {
      label: "Total bookings",
      value: bookings.length.toString(),
      icon: Calendar,
      description: `${pending} pending approval`,
    },
    {
      label: "Revenue",
      value: formatPrice(revenue, "USD"),
      icon: DollarSign,
      description: "Confirmed + completed",
    },
    {
      label: "Sessions completed",
      value: bookings.filter((b) => b.status === "completed").length.toString(),
      icon: Clock,
      description: "All time",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
