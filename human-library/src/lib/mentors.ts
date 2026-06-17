import { mentors } from "@/data/mentors";
import type { Mentor } from "@/types";

export type MentorSortOption = "popularity" | "rating" | "price-asc" | "price-desc";

export interface MentorSearchQuery {
  search?: string;
  profession?: string;
  category?: string;
  maxRate?: number;
  minRating?: number;
  sort?: MentorSortOption;
}

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

export function getProfessions(): string[] {
  const professions = mentors.map((m) => m.profession);
  return [...new Set(professions)].sort();
}

export function filterMentors(query: MentorSearchQuery): Mentor[] {
  let results = [...mentors];

  if (query.search) {
    const term = query.search.toLowerCase();
    results = results.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.profession.toLowerCase().includes(term) ||
        m.bio.toLowerCase().includes(term) ||
        m.skills.some((s) => s.toLowerCase().includes(term))
    );
  }

  if (query.profession) {
    results = results.filter((m) => m.profession === query.profession);
  }

  if (query.category) {
    results = results.filter((m) => m.categoryIds.includes(query.category!));
  }

  if (query.maxRate) {
    results = results.filter((m) => m.hourlyRate <= query.maxRate!);
  }

  if (query.minRating) {
    results = results.filter((m) => m.rating >= query.minRating!);
  }

  switch (query.sort) {
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "price-asc":
      results.sort((a, b) => a.hourlyRate - b.hourlyRate);
      break;
    case "price-desc":
      results.sort((a, b) => b.hourlyRate - a.hourlyRate);
      break;
    case "popularity":
    default:
      results.sort((a, b) => b.totalSessions - a.totalSessions);
      break;
  }

  return results;
}

/** @deprecated Use filterMentors instead */
export function searchMentors(query: {
  search?: string;
  category?: string;
  maxRate?: number;
}): Mentor[] {
  return filterMentors(query);
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

/** @deprecated Use mentor.profileImage directly */
export function getMentorAvatarUrl(seed: string): string {
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
}
