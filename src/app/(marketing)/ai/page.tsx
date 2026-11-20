import { BookOpen, CircleHelp, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { ChatPanel } from "@/components/site/chat";
import { Reveal } from "@/components/site/motion";
import { PageHero } from "@/components/site/sections";
import { aiBrain } from "@/content/site";

export const metadata: Metadata = { title: "GC AI Assistant (Demo)" };

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
      <section className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
        <ul className="grid gap-5">
          {points.map(({ Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={0.1 * i} className="flex items-start gap-5 rounded-3xl border border-border bg-card p-7">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ink text-brass">
                <Icon className="size-7" aria-hidden />
              </span>
              <div>
                <h2 className="font-serif text-2xl text-ink md:text-3xl">{title}</h2>
                <p className="mt-2 text-lg text-slate-ink">{body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.3} className="text-base text-slate-ink">
            Try the floating “Ask GC AI” button too. It works on every page.
          </Reveal>
        </ul>
        <Reveal delay={0.15}>
          <ChatPanel className="h-[640px]" />
        </Reveal>
      </section>
    </>
  );
}
