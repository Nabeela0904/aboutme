import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, Calendar } from "lucide-react";
import type { Mentor } from "@/types";
import { formatPrice } from "@/lib/mentors";
import { categories } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  mentor: Mentor;
}

export function ProfileHeader({ mentor }: ProfileHeaderProps) {
  return (
    <div className="rounded-xl border bg-card p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row">
        <Image
          src={mentor.profileImage}
          alt={mentor.name}
          width={120}
          height={120}
          unoptimized
          className="rounded-2xl bg-muted"
        />

        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{mentor.name}</h1>
            <p className="mt-1 text-lg text-muted-foreground">
              {mentor.profession}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium text-foreground">{mentor.rating}</span>
              ({mentor.reviews.length} reviews)
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {mentor.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {mentor.yearsExperience} years experience
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {mentor.categoryIds.map((catId) => {
              const cat = categories.find((c) => c.id === catId);
              return cat ? (
                <Badge key={catId} variant="secondary">
                  {cat.name}
                </Badge>
              ) : null;
            })}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div className="text-right">
            <span className="text-3xl font-bold">
              {formatPrice(mentor.hourlyRate, mentor.currency)}
            </span>
            <span className="text-muted-foreground">/hour</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {mentor.totalSessions} sessions completed
          </p>
          <Button size="lg" className="gap-2" render={<Link href={`/booking/${mentor.slug}`} />}>
            <Calendar className="h-4 w-4" />
            Book a session
          </Button>
        </div>
      </div>
    </div>
  );
}
