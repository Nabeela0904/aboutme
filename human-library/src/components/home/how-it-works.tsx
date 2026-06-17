import { Search, CalendarCheck, MessageSquare } from "lucide-react";
import { SectionHeader } from "@/components/home/section-header";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Find your person",
    description:
      "Browse mentors by life experience — career changes, startup journeys, leadership challenges. Read real stories, not résumés.",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Book a conversation",
    description:
      "Pick a time that works. Sessions are 30, 60, or 90 minutes. You set the agenda — they bring the lived experience.",
    accent: "bg-orange-50 text-orange-600",
  },
  {
    icon: MessageSquare,
    step: "03",
    title: "Walk away wiser",
    description:
      "Show up with your questions. Leave with clarity, a concrete plan, and the confidence that comes from talking to someone who's been there.",
    accent: "bg-emerald-50 text-emerald-600",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How it works"
          title="Three steps to the conversation you need"
          description="No subscriptions. No courses. Just a real person who's already lived your challenge."
        />

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          <div className="absolute top-16 hidden h-0.5 w-full bg-border md:block" style={{ left: "16.67%", width: "66.67%" }} />

          {steps.map((step) => (
            <div
              key={step.title}
              className="relative rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.accent}`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-4xl font-bold text-muted-foreground/20">
                  {step.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
