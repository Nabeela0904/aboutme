import { Search, Calendar, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse the catalog",
    description:
      "Explore mentors by expertise, industry, and price. Every profile includes real reviews from past mentees.",
  },
  {
    icon: Calendar,
    title: "Book a session",
    description:
      "Pick a time that works for both of you. Sessions are 30, 60, or 90 minutes — you set the agenda.",
  },
  {
    icon: MessageCircle,
    title: "Grow together",
    description:
      "Show up with your questions. Leave with actionable advice, a clearer path, and a human connection.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          <p className="mt-3 text-muted-foreground">
            Three steps from curiosity to clarity. No subscriptions, no fluff.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <step.icon className="h-5 w-5" />
              </div>
              <span className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Step {index + 1}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
