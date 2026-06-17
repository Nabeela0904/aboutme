"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { MentorSortOption } from "@/lib/mentors";
import { filterMentors } from "@/lib/mentors";
import { MentorCard } from "@/components/mentors/mentor-card";
import { MentorFilters, type MentorFiltersState } from "@/components/mentors/mentor-filters";

const defaultFilters: MentorFiltersState = {
  search: "",
  profession: "",
  maxRate: "",
  minRating: "",
  sort: "popularity",
  category: "",
};

interface MentorsListProps {
  professions: string[];
}

export function MentorsList({ professions }: MentorsListProps) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<MentorFiltersState>({
    search: searchParams.get("q") ?? "",
    profession: "",
    maxRate: searchParams.get("maxRate") ?? "",
    minRating: "",
    sort: (searchParams.get("sort") as MentorSortOption) ?? "popularity",
    category: searchParams.get("category") ?? "",
  });

  const filteredMentors = useMemo(() => {
    const hasFilters =
      filters.search ||
      filters.profession ||
      filters.category ||
      filters.maxRate ||
      filters.minRating ||
      filters.sort !== "popularity";

    if (!hasFilters) {
      return filterMentors({ sort: "popularity" });
    }

    return filterMentors({
      search: filters.search || undefined,
      profession: filters.profession || undefined,
      category: filters.category || undefined,
      maxRate: filters.maxRate ? Number(filters.maxRate) : undefined,
      minRating: filters.minRating ? Number(filters.minRating) : undefined,
      sort: filters.sort,
    });
  }, [filters]);

  function handleReset() {
    setFilters(defaultFilters);
  }

  return (
    <div className="space-y-6">
      <MentorFilters
        filters={filters}
        professions={professions}
        onChange={setFilters}
        onReset={handleReset}
        resultCount={filteredMentors.length}
      />

      {filteredMentors.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-white py-20 text-center">
          <p className="text-lg font-medium">No mentors match your filters</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try broadening your search or clearing some filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      )}
    </div>
  );
}
