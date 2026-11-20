import { BookOpen, CircleHelp, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { ChatPanel } from "@/components/site/chat";
import { Reveal } from "@/components/site/motion";
import { PageHero } from "@/components/site/sections";
import { aiBrain } from "@/content/site";

export const metadata: Metadata = { title: "CPC AI Assistant (Demo)" };

const points = [
  {
    Icon: BookOpen,
    title: "Knows your work",
    body: "Answers come from projects and facts the owner has confirmed.",
  },
  {
    Icon: CircleHelp,
    title: "Says “I don't know yet”",
    body: "If the answer isn't in the owner's info, it says so instead of guessing.",
  },
  {
    Icon: ShieldCheck,
    title: "Private to the owner",
    body: "In the real version, the owner controls what it knows.",
  },
];

export default function AiPage() {
  return (
    <>
      <PageHero {...aiBrain.intro}>
        <p className="mt-8 inline-flex rounded-md border-2 border-dashed border-brass px-3 py-1.5 text-sm font-bold tracking-[0.12em] text-brass uppercase">
          {aiBrain.demoLabel}
        </p>
      </PageHero>
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <ul className="grid gap-4 sm:gap-5">
          {points.map(({ Icon, title, body }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={0.1 * i}
              className="flex items-start gap-4 rounded-3xl border border-border bg-card p-5 sm:gap-5 sm:p-7"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-brass sm:size-14">
                <Icon className="size-6 sm:size-7" aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="font-serif text-2xl text-ink md:text-3xl">{title}</h2>
                <p className="mt-2 text-lg text-slate-ink">{body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.3} className="text-base text-slate-ink">
            On every other page, the floating “Ask CPC AI” button opens this same assistant.
          </Reveal>
        </ul>
        <Reveal delay={0.15}>
          <ChatPanel className="h-[min(640px,calc(100svh-9rem))] min-h-[26rem]" />
        </Reveal>
      </section>
    </>
  );
}
