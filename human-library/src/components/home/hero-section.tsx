import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.92_0.06_55),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5" />
            Real humans. Real stories. Real growth.
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Borrow wisdom from the{" "}
            <span className="text-primary">Human Library</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            {siteConfig.description} Book 1-on-1 sessions with vetted mentors who have
            walked the path you are on.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2" render={<Link href="/mentors" />}>
              Find your mentor
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/register" />}
            >
              Become a mentor
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div>
              <span className="block text-2xl font-bold text-foreground">8+</span>
              Expert mentors
            </div>
            <div>
              <span className="block text-2xl font-bold text-foreground">2,400+</span>
              Sessions completed
            </div>
            <div>
              <span className="block text-2xl font-bold text-foreground">4.8★</span>
              Average rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
