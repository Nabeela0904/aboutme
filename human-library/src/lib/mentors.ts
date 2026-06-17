import { mentors } from "@/data/mentors";
import type { Mentor } from "@/types";

export function getAllMentors(): Mentor[] {
  return mentors;
}

export function getFeaturedMentors(): Mentor[] {
  return mentors.filter((m) => m.featured);
}

export function getMentorBySlug(slug: string): Mentor | undefined {
  return mentors.find((m) => m.slug === slug);
}

export function getMentorById(id: string): Mentor | undefined {
  return mentors.find((m) => m.id === id);
}

export function searchMentors(query: {
  search?: string;
  category?: string;
  maxRate?: number;
}): Mentor[] {
  let results = [...mentors];

  if (query.search) {
    const term = query.search.toLowerCase();
    results = results.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.title.toLowerCase().includes(term) ||
        m.bio.toLowerCase().includes(term) ||
        m.skills.some((s) => s.toLowerCase().includes(term))
    );
  }

  if (query.category) {
    results = results.filter((m) => m.categories.includes(query.category!));
  }

  if (query.maxRate) {
    results = results.filter((m) => m.hourlyRate <= query.maxRate!);
  }

  return results.sort((a, b) => b.rating - a.rating);
}

export function getMentorAvatarUrl(seed: string): string {
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
