import { Check, MessageSquareQuote } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/site/motion";
import { PageHero, PrimaryButton } from "@/components/site/sections";
import { reviews } from "@/content/site";

export const metadata: Metadata = { title: "Reviews" };

export default function ReviewsPage() {
  return (
    <>
      <PageHero {...reviews.intro} />
      <section className="mx-auto max-w-4xl px-5 py-24 md:px-8 md:py-32">
        <Reveal className="relative overflow-hidden rounded-[2rem] border-2 border-dashed border-border bg-card px-6 py-16 text-center md:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,151,74,0.14),transparent_60%)]" aria-hidden />
          <div className="relative">
            <span className="mx-auto grid size-20 place-items-center rounded-full bg-sand text-brass-deep">
              <MessageSquareQuote className="size-9" aria-hidden />
            </span>
            <h2 className="mt-8 font-serif text-4xl text-ink md:text-5xl">{reviews.emptyTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-xl text-slate-ink">{reviews.emptyBody}</p>
            <ol className="mx-auto mt-10 grid max-w-md gap-3 text-left">
              {reviews.nextSteps.map((s, i) => (
                <Reveal as="li" key={s} delay={0.1 * i} className="flex items-center gap-3 rounded-xl bg-bone px-4 py-3 text-lg text-ink">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-brass">
                    <Check className="size-4" aria-hidden />
                  </span>
                  {s}
                </Reveal>
              ))}
            </ol>
            <div className="mt-12 flex justify-center">
              <PrimaryButton href={reviews.cta.href}>{reviews.cta.label}</PrimaryButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
