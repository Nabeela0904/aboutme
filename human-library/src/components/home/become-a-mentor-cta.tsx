import Link from "next/link";
import { ArrowRight, CheckCircle2, DollarSign, Clock, Users } from "lucide-react";
import { MentorAvatar } from "@/components/shared/mentor-avatar";
import { buildProfileImage } from "@/lib/avatar";
import { Button } from "@/components/ui/button";

const perks = [
  { icon: DollarSign, text: "Set your own hourly rate" },
  { icon: Clock, text: "Flexible schedule — you choose availability" },
  { icon: Users, text: "Reach motivated mentees worldwide" },
];

const mentorAvatars = ["sarah-okafor", "david-kim", "maria-santos", "amara-diallo"];

export function BecomeAMentorCta() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-foreground text-background">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-background/60">
                For mentors
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your experience is someone else&apos;s shortcut
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-background/70">
                Join Human Library and turn the hard-won lessons from your career
                into meaningful conversations — on your schedule, at your rate.
              </p>

              <ul className="mt-8 space-y-3">
                {perks.map((perk) => (
                  <li key={perk.text} className="flex items-center gap-3 text-background/80">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                    <span>{perk.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 rounded-xl"
                  render={<Link href="/register" />}
                >
                  Apply to become a mentor
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-background/30 bg-transparent text-background hover:bg-background/10"
                  render={<Link href="/#how-it-works" />}
                >
                  Learn more
                </Button>
              </div>
            </div>

            <div className="relative hidden bg-background/5 lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <div className="flex h-full flex-col items-center justify-center p-12">
                <div className="grid grid-cols-2 gap-4">
                  {mentorAvatars.map((seed, i) => (
                    <div
                      key={seed}
                      className={`overflow-hidden rounded-2xl border border-background/10 shadow-2xl ${
                        i % 2 === 1 ? "mt-8" : ""
                      }`}
                    >
                      <MentorAvatar
                        src={buildProfileImage(seed)}
                        alt="Mentor"
                        size={160}
                        className="aspect-square object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-center text-sm text-background/60">
                  Join 140+ mentors already sharing their stories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
