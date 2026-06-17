import type { Metadata } from "next";
import { Suspense } from "react";
import { MentorsList } from "@/components/mentors/mentors-list";
import { getAllMentors } from "@/lib/mentors";

export const metadata: Metadata = {
  title: "Browse Mentors",
  description: "Find and book 1-on-1 mentorship sessions with experienced professionals.",
};

export default function MentorsPage() {
  const mentors = getAllMentors();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Browse mentors</h1>
        <p className="mt-2 text-muted-foreground">
          Filter by expertise, category, or price to find the right human book for your story.
        </p>
      </div>
      <Suspense fallback={<div className="text-muted-foreground">Loading mentors...</div>}>
        <MentorsList initialMentors={mentors} />
      </Suspense>
    </div>
  );
}
