import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight">
            Your next chapter starts with one conversation
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Join thousands of professionals who have accelerated their careers
            through meaningful mentorship.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 gap-2"
            render={<Link href="/mentors" />}
          >
            Start browsing
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
