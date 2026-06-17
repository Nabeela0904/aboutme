"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getFeaturedMentors, getMentorAvatarUrl } from "@/lib/mentors";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const featuredForHero = getFeaturedMentors().slice(0, 4);

export function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (category) params.set("category", category);
    const query = params.toString();
    router.push(`/mentors${query ? `?${query}` : ""}`);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f5f2] via-background to-background">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">2,400+</span> conversations booked
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
              {siteConfig.tagline}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Skip the guesswork. Connect with people who&apos;ve navigated the
              career pivots, startup launches, and life decisions you&apos;re facing
              right now.
            </p>

            <form
              onSubmit={handleSearch}
              className="mt-8 flex flex-col gap-2 rounded-2xl border bg-white p-2 shadow-lg shadow-black/5 sm:flex-row sm:items-center"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="What do you need help with?"
                  className="border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={category} onValueChange={(v) => setCategory(v ?? "")}>
                <SelectTrigger className="w-full border-0 bg-muted/50 sm:w-44">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All topics</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit" className="rounded-xl px-6">
                Search
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button size="lg" className="gap-2 rounded-xl" render={<Link href="/mentors" />}>
                Explore mentors
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-xl text-muted-foreground"
                render={<Link href="/#how-it-works" />}
              >
                See how it works
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {featuredForHero.map((m) => (
                  <Image
                    key={m.id}
                    src={getMentorAvatarUrl(m.avatarSeed)}
                    alt={m.name}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white bg-muted"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 font-semibold">4.9</span>
                </div>
                <p className="text-muted-foreground">from 500+ reviews</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {featuredForHero.map((mentor, i) => (
                <Link
                  key={mentor.id}
                  href={`/mentors/${mentor.slug}`}
                  className={`group relative overflow-hidden rounded-2xl border bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl ${
                    i === 1 ? "mt-8" : i === 2 ? "-mt-4" : ""
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={getMentorAvatarUrl(mentor.avatarSeed)}
                      alt={mentor.name}
                      width={280}
                      height={210}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold">{mentor.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {mentor.title}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {mentor.rating}
                      </span>
                      <span className="text-sm font-semibold">
                        ${mentor.hourlyRate}
                        <span className="font-normal text-muted-foreground">/hr</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
