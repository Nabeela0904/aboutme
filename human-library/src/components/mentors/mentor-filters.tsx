"use client";

import { Search } from "lucide-react";
import { categories } from "@/data/categories";
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
  category: string;
  maxRate: string;
}

interface MentorFiltersProps {
  filters: MentorFiltersState;
  onChange: (filters: MentorFiltersState) => void;
}

export function MentorFilters({ filters, onChange }: MentorFiltersProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="space-y-2 sm:col-span-1">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Name, skill, or keyword..."
            className="pl-9"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) => onChange({ ...filters, category: value ?? "" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Max rate</Label>
        <Select
          value={filters.maxRate}
          onValueChange={(value) => onChange({ ...filters, maxRate: value ?? "" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any price</SelectItem>
            <SelectItem value="100">Up to $100/hr</SelectItem>
            <SelectItem value="150">Up to $150/hr</SelectItem>
            <SelectItem value="200">Up to $200/hr</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
