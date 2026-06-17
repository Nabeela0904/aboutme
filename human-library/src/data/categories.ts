import type { Category } from "@/types";
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

export const categoryDefinitions: Category[] = [
  { id: "career", name: "Career Growth", description: "Navigate transitions, promotions, and job searches" },
  { id: "leadership", name: "Leadership", description: "Build teams, manage people, and lead with impact" },
  { id: "startup", name: "Startups", description: "Founding, fundraising, and scaling early-stage companies" },
  { id: "tech", name: "Technology", description: "Engineering, product, and technical career paths" },
  { id: "design", name: "Design", description: "UX, visual design, and creative direction" },
  { id: "wellness", name: "Wellness", description: "Work-life balance, burnout recovery, and mental health" },
  { id: "finance", name: "Finance", description: "Personal finance, investing, and financial planning" },
  { id: "marketing", name: "Marketing", description: "Growth, branding, and go-to-market strategy" },
];

const iconMap: Record<string, LucideIcon> = {
  career: TrendingUp,
  leadership: Users,
  startup: Rocket,
  tech: Code,
  design: Palette,
  wellness: Heart,
  finance: DollarSign,
  marketing: Megaphone,
};

const colorMap: Record<string, string> = {
  career: "bg-blue-50 text-blue-600",
  leadership: "bg-violet-50 text-violet-600",
  startup: "bg-orange-50 text-orange-600",
  tech: "bg-sky-50 text-sky-600",
  design: "bg-pink-50 text-pink-600",
  wellness: "bg-rose-50 text-rose-600",
  finance: "bg-emerald-50 text-emerald-600",
  marketing: "bg-amber-50 text-amber-600",
};

/** UI-enriched categories for landing page display */
export const categories = categoryDefinitions.map((cat) => ({
  ...cat,
  label: cat.name,
  icon: iconMap[cat.id],
  color: colorMap[cat.id],
  mentorCount: 0, // populated at runtime via getCategoriesWithCounts()
}));

export type CategoryId = Category["id"];

export function getCategoriesWithCounts(mentorCategoryIds: string[][]) {
  const counts: Record<string, number> = {};
  for (const ids of mentorCategoryIds) {
    for (const id of ids) {
      counts[id] = (counts[id] ?? 0) + 1;
    }
  }
  return categories.map((cat) => ({
    ...cat,
    mentorCount: counts[cat.id] ?? 0,
  }));
}
