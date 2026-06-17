import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileHeader } from "@/components/mentor-profile/profile-header";
import { AvailabilityGrid } from "@/components/mentor-profile/availability-grid";
import { ReviewsList } from "@/components/mentor-profile/reviews-list";
import { getMentorBySlug, getAllMentors } from "@/lib/mentors";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MentorProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllMentors().map((mentor) => ({ slug: mentor.slug }));
}

export async function generateMetadata({ params }: MentorProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const mentor = getMentorBySlug(slug);
  if (!mentor) return { title: "Mentor Not Found" };
  return {
    title: mentor.name,
    description: mentor.bio,
  };
}

export default async function MentorProfilePage({ params }: MentorProfilePageProps) {
  const { slug } = await params;
  const mentor = getMentorBySlug(slug);

  if (!mentor) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <ProfileHeader mentor={mentor} />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{mentor.longBio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills & expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mentor.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <ReviewsList reviews={mentor.reviews} />
        </div>

        <div>
          <AvailabilityGrid availability={mentor.availability} />
        </div>
      </div>
    </div>
  );
}
