import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { getMentorBySlug } from "@/lib/mentors";

interface BookingPageProps {
  params: Promise<{ mentorSlug: string }>;
}

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { mentorSlug } = await params;
  const mentor = getMentorBySlug(mentorSlug);
  if (!mentor) return { title: "Booking" };
  return {
    title: `Book ${mentor.name}`,
    description: `Schedule a mentorship session with ${mentor.name}.`,
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { mentorSlug } = await params;
  const mentor = getMentorBySlug(mentorSlug);

  if (!mentor) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <BookingWizard mentor={mentor} />
    </div>
  );
}
