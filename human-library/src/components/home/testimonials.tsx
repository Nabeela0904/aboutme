import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { getMentorAvatarUrl } from "@/lib/mentors";
import { SectionHeader } from "@/components/home/section-header";

export function Testimonials() {
  return (
    <section className="bg-[#f7f5f2] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Real stories"
          title="Conversations that changed trajectories"
          description="Don't take our word for it — hear from people who booked a session and moved forward."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className={`relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm ${
                index === 0 ? "md:row-span-1" : ""
              }`}
            >
              <Quote className="mb-4 h-8 w-8 text-primary/20" />

              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="flex-1 text-base leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center justify-between border-t pt-6">
                <div className="flex items-center gap-3">
                  <Image
                    src={getMentorAvatarUrl(t.avatarSeed)}
                    alt={t.author}
                    width={44}
                    height={44}
                    className="rounded-full bg-muted"
                  />
                  <div>
                    <p className="font-semibold">{t.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.role} at {t.company}
                    </p>
                  </div>
                </div>
                <div className="hidden text-right text-sm sm:block">
                  <p className="text-muted-foreground">Mentored by</p>
                  <p className="font-medium text-primary">{t.mentorName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
