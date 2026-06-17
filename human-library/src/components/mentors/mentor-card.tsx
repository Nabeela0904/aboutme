import Link from "next/link";
import Image from "next/image";
import { Star, Briefcase, Calendar } from "lucide-react";
import type { Mentor } from "@/types";
import { formatPrice } from "@/lib/mentors";
import { Button } from "@/components/ui/button";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/mentors/${mentor.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={mentor.profileImage}
          alt={mentor.name}
          width={400}
          height={300}
          unoptimized
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-sm font-medium shadow-sm backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {mentor.rating}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/mentors/${mentor.slug}`} className="group/link">
          <h3 className="text-lg font-semibold tracking-tight group-hover/link:text-primary">
            {mentor.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {mentor.profession}
          </p>
        </Link>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            {mentor.yearsExperience} yrs exp.
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {mentor.totalSessions} sessions
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t pt-4">
          <div>
            <span className="text-xl font-bold text-foreground">
              {formatPrice(mentor.hourlyRate, mentor.currency)}
            </span>
            <span className="text-sm text-muted-foreground"> / hour</span>
          </div>
          <Button
            size="sm"
            className="rounded-lg"
            render={<Link href={`/booking/${mentor.slug}`} />}
          >
            Book session
          </Button>
        </div>
      </div>
    </article>
  );
}
