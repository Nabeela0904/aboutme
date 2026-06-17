import Link from "next/link";
import { ArrowRight, Star, BadgeCheck } from "lucide-react";
import type { Mentor } from "@/types";
import { formatPrice } from "@/lib/mentors";
import { MentorAvatar } from "@/components/shared/mentor-avatar";
import { categories } from "@/data/categories";
import { SectionHeader } from "@/components/home/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FeaturedMentorsProps {
  mentors: Mentor[];
}

function FeaturedMentorCard({ mentor }: { mentor: Mentor }) {
  const primaryCategory = categories.find((c) => c.id === mentor.categories[0]);

  return (
    <Link
      href={`/mentors/${mentor.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <MentorAvatar
          seed={mentor.avatarSeed}
          alt={mentor.name}
          size={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {mentor.featured && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5 text-primary" />
            Top rated
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-foreground">{mentor.name}</h3>
            <p className="truncate text-sm text-muted-foreground">
              {mentor.title}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium">{mentor.rating}</span>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {mentor.bio}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {primaryCategory && (
            <Badge variant="secondary" className="rounded-md text-xs font-normal">
              {primaryCategory.label}
            </Badge>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <p className="text-sm text-muted-foreground">
            <span className="text-base font-bold text-foreground">
              {formatPrice(mentor.hourlyRate, mentor.currency)}
            </span>
            {" "}/ session hour
          </p>
          <span className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedMentors({ mentors }: FeaturedMentorsProps) {
  return (
    <section className="bg-[#f7f5f2] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            align="left"
            eyebrow="Featured mentors"
            title="People worth talking to"
            description="Vetted professionals who've done the hard things — and are ready to help you do them too."
          />
          <Button
            variant="outline"
            className="shrink-0 gap-2 rounded-xl border-foreground/20 bg-white"
            render={<Link href="/mentors" />}
          >
            View all mentors
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.map((mentor) => (
            <FeaturedMentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </section>
  );
}
