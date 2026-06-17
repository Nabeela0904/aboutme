"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import type { MentorSortOption } from "@/lib/mentors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface MentorFiltersState {
  search: string;
  profession: string;
  maxRate: string;
  minRating: string;
  sort: MentorSortOption;
  category: string;
}

interface MentorFiltersProps {
  filters: MentorFiltersState;
  professions: string[];
  onChange: (filters: MentorFiltersState) => void;
  onReset: () => void;
  resultCount: number;
}

export function MentorFilters({
  filters,
  professions,
  onChange,
  onReset,
  resultCount,
}: MentorFiltersProps) {
  const hasActiveFilters =
    filters.search ||
    filters.profession ||
    filters.maxRate ||
    filters.minRating ||
    filters.category ||
    filters.sort !== "popularity";

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            Filter & sort
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground" onClick={onReset}>
              <X className="h-3.5 w-3.5" />
              Clear all
            </Button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="space-y-2 sm:col-span-2 lg:col-span-2 xl:col-span-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Name, skill, or keyword..."
                className="rounded-xl pl-9"
                value={filters.search}
                onChange={(e) => onChange({ ...filters, search: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Profession</Label>
            <Select
              value={filters.profession}
              onValueChange={(value) => onChange({ ...filters, profession: value ?? "" })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="All professions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All professions</SelectItem>
                {professions.map((profession) => (
                  <SelectItem key={profession} value={profession}>
                    <span className="line-clamp-1">{profession}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Max price</Label>
            <Select
              value={filters.maxRate}
              onValueChange={(value) => onChange({ ...filters, maxRate: value ?? "" })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Any price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any price</SelectItem>
                <SelectItem value="100">Up to $100/hr</SelectItem>
                <SelectItem value="125">Up to $125/hr</SelectItem>
                <SelectItem value="150">Up to $150/hr</SelectItem>
                <SelectItem value="200">Up to $200/hr</SelectItem>
                <SelectItem value="250">Up to $250/hr</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Min rating</Label>
            <Select
              value={filters.minRating}
              onValueChange={(value) => onChange({ ...filters, minRating: value ?? "" })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any rating</SelectItem>
                <SelectItem value="4.5">4.5+ stars</SelectItem>
                <SelectItem value="4.7">4.7+ stars</SelectItem>
                <SelectItem value="4.8">4.8+ stars</SelectItem>
                <SelectItem value="4.9">4.9+ stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sort by</Label>
            <Select
              value={filters.sort}
              onValueChange={(value) =>
                onChange({ ...filters, sort: (value ?? "popularity") as MentorSortOption })
              }
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="rating">Highest rated</SelectItem>
                <SelectItem value="price-asc">Price: low to high</SelectItem>
                <SelectItem value="price-desc">Price: high to low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{resultCount}</span> mentor
        {resultCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
