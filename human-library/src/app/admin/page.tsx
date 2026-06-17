import type { Metadata } from "next";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { BookingsTable } from "@/components/admin/bookings-table";
import { MentorsTable } from "@/components/admin/mentors-table";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage mentors, bookings, and platform operations.",
};

export default function AdminDashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Platform overview and management tools.
        </p>
      </div>

      <div className="space-y-8">
        <DashboardStats />
        <BookingsTable />
        <MentorsTable />
      </div>
    </div>
  );
}
