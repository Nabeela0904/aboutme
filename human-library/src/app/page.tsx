import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedMentors } from "@/components/home/featured-mentors";
import { Testimonials } from "@/components/home/testimonials";
import { CtaSection } from "@/components/home/cta-section";
import { getFeaturedMentors } from "@/lib/mentors";

export default function HomePage() {
  const featuredMentors = getFeaturedMentors();

  return (
    <>
      <HeroSection />
      <FeaturedMentors mentors={featuredMentors} />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
    </>
  );
}
