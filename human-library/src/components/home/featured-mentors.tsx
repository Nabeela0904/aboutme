import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Mentor } from "@/types";
import { MentorCard } from "@/components/mentors/mentor-card";
import { Button } from "@/components/ui/button";

interface FeaturedMentorsProps {
  mentors: Mentor[];
}

export function FeaturedMentors({ mentors }: FeaturedMentorsProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured mentors</h2>
            <p className="mt-2 text-muted-foreground">
              Hand-picked experts ready to share their experience.
            </p>
          </div>
          <Button variant="outline" className="gap-2" render={<Link href="/mentors" />}>
            View all mentors
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </section>
  );
}
