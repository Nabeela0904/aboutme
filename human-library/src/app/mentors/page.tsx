import type { Metadata } from "next";
import { Suspense } from "react";
import { MentorsList } from "@/components/mentors/mentors-list";
import { getAllMentors, getProfessions } from "@/lib/mentors";

export const metadata: Metadata = {
  title: "Browse Mentors",
  description: "Search and filter mentors by profession, price, and rating. Book 1-on-1 mentorship sessions.",
};

export default function MentorsPage() {
  const mentors = getAllMentors();
  const professions = getProfessions();

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Human Library
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Find your mentor
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Search {mentors.length} experienced professionals. Filter by profession, price,
            and rating — then book a conversation with someone who&apos;s already lived it.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="rounded-2xl border bg-white p-12 text-center text-muted-foreground">
              Loading mentors...
            </div>
          }
        >
          <MentorsList professions={professions} />
        </Suspense>
      </div>
    </div>
  );
}
