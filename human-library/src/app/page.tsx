import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedMentors } from "@/components/home/featured-mentors";
import { CategoriesSection } from "@/components/home/categories-section";
import { Testimonials } from "@/components/home/testimonials";
import { BecomeAMentorCta } from "@/components/home/become-a-mentor-cta";
import { getFeaturedMentors } from "@/lib/mentors";

export default function HomePage() {
  const featuredMentors = getFeaturedMentors();

  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturedMentors mentors={featuredMentors} />
      <CategoriesSection />
      <Testimonials />
      <BecomeAMentorCta />
    </>
  );
}
