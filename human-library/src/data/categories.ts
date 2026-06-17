import type { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  Users,
  Rocket,
  Code,
  Palette,
  Heart,
  DollarSign,
  Megaphone,
} from "lucide-react";

export const categories: Array<{
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  mentorCount: number;
  color: string;
}> = [
  {
    id: "career",
    label: "Career Growth",
    description: "Navigate transitions, promotions, and job searches",
    icon: TrendingUp,
    mentorCount: 24,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "leadership",
    label: "Leadership",
    description: "Build teams, manage people, and lead with impact",
    icon: Users,
    mentorCount: 18,
    color: "bg-violet-50 text-violet-600",
  },
  {
    id: "startup",
    label: "Startups",
    description: "Founding, fundraising, and scaling early-stage companies",
    icon: Rocket,
    mentorCount: 15,
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: "tech",
    label: "Technology",
    description: "Engineering, product, and technical career paths",
    icon: Code,
    mentorCount: 32,
    color: "bg-sky-50 text-sky-600",
  },
  {
    id: "design",
    label: "Design",
    description: "UX, visual design, and creative direction",
    icon: Palette,
    mentorCount: 12,
    color: "bg-pink-50 text-pink-600",
  },
  {
    id: "wellness",
    label: "Wellness",
    description: "Work-life balance, burnout recovery, and mental health",
    icon: Heart,
    mentorCount: 9,
    color: "bg-rose-50 text-rose-600",
  },
  {
    id: "finance",
    label: "Finance",
    description: "Personal finance, investing, and financial planning",
    icon: DollarSign,
    mentorCount: 14,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Growth, branding, and go-to-market strategy",
    icon: Megaphone,
    mentorCount: 16,
    color: "bg-amber-50 text-amber-600",
  },
];

export type CategoryId = (typeof categories)[number]["id"];
