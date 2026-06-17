"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Mentor } from "@/types";
import { searchMentors } from "@/lib/mentors";
import { MentorCard } from "@/components/mentors/mentor-card";
import { MentorFilters, type MentorFiltersState } from "@/components/mentors/mentor-filters";

interface MentorsListProps {
  initialMentors: Mentor[];
}

export function MentorsList({ initialMentors }: MentorsListProps) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<MentorFiltersState>({
    search: searchParams.get("q") ?? "",
    category: searchParams.get("category") ?? "",
    maxRate: searchParams.get("maxRate") ?? "",
  });

  const filteredMentors = useMemo(() => {
    if (!filters.search && !filters.category && !filters.maxRate) {
      return initialMentors;
    }
    return searchMentors({
      search: filters.search || undefined,
      category: filters.category || undefined,
      maxRate: filters.maxRate ? Number(filters.maxRate) : undefined,
    });
  }, [filters, initialMentors]);

  return (
    <div className="space-y-8">
      <MentorFilters filters={filters} onChange={setFilters} />

      <p className="text-sm text-muted-foreground">
        Showing {filteredMentors.length} mentor{filteredMentors.length !== 1 ? "s" : ""}
      </p>

      {filteredMentors.length === 0 ? (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <p className="font-medium">No mentors match your filters</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      )}
    </div>
  );
}
