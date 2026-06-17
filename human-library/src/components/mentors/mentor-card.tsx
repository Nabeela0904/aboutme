import Link from "next/link";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import type { Mentor } from "@/types";
import { getMentorAvatarUrl, formatPrice } from "@/lib/mentors";
import { categories } from "@/data/categories";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  const primaryCategory = categories.find((c) => c.id === mentor.categories[0]);

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Image
            src={getMentorAvatarUrl(mentor.avatarSeed)}
            alt={mentor.name}
            width={48}
            height={48}
            className="rounded-full bg-muted"
          />
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold">{mentor.name}</h3>
            <p className="truncate text-sm text-muted-foreground">
              {mentor.title} at {mentor.company}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <p className="line-clamp-2 text-sm text-muted-foreground">{mentor.bio}</p>

        <div className="flex flex-wrap gap-1.5">
          {primaryCategory && (
            <Badge variant="secondary" className="text-xs">
              {primaryCategory.label}
            </Badge>
          )}
          {mentor.skills.slice(0, 2).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="font-medium">{mentor.rating}</span>
            <span className="text-muted-foreground">({mentor.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate text-xs">{mentor.location.split(",")[0]}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div>
          <span className="text-lg font-bold">
            {formatPrice(mentor.hourlyRate, mentor.currency)}
          </span>
          <span className="text-sm text-muted-foreground">/hr</span>
        </div>
        <Button size="sm" render={<Link href={`/mentors/${mentor.slug}`} />}>
          View profile
        </Button>
      </CardFooter>
    </Card>
  );
}
