import { MapPin, UserRound } from "lucide-react";
import type { Metadata } from "next";
import { ParallaxImage, Reveal } from "@/components/site/motion";
import { Ph } from "@/components/site/ph";
import { CtaBand, Eyebrow, ImageNote, PageHero, SectionHeading, ToConfirm } from "@/components/site/sections";
import { about, company, home, images } from "@/content/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero {...about.intro} image={images.blueprints} />

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal y={40}>
          <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[2rem] border-2 border-dashed border-brass-deep/40 bg-sand">
            <div className="blueprint-grid absolute inset-0 opacity-70" aria-hidden />
            <div className="relative text-center">
              <span className="mx-auto grid size-28 place-items-center rounded-full bg-card text-brass-deep shadow-sm">
                <UserRound className="size-14" aria-hidden />
              </span>
              <p className="mt-5 px-6 text-base text-slate-ink">
                <Ph text={about.story.portrait} />
              </p>
            </div>
          </div>
        </Reveal>
        <div>
          <SectionHeading eyebrow="The builder" title={about.story.title} />
          <Reveal delay={0.1}>
            <p className="mt-4 text-xl text-ink">
              <Ph text={company.principal} />, <Ph text={company.principalTitle} />, {company.name}
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5">
            {about.story.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="text-xl leading-relaxed text-slate-ink">
                  <Ph text={p} />
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3} className="mt-10 rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-slate-ink uppercase">Years in business</p>
            <p className="mt-2 font-serif text-3xl text-ink">
              <Ph text={about.story.yearsInBusiness} />
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <ParallaxImage src={images.framing.src} alt={images.framing.alt} className="h-[70vh] min-h-[480px]" strength={100} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" aria-hidden />
        <div className="on-dark absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-14 text-white md:px-8 md:pb-20">
          <Reveal>
            <Eyebrow light>{about.roots.title}</Eyebrow>
            <p className="mt-5 flex max-w-3xl items-start gap-3 font-serif text-3xl leading-tight font-light md:text-5xl">
              <MapPin className="mt-2 size-8 shrink-0 text-brass" aria-hidden />
              {about.roots.body}
            </p>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              <Ph text={about.roots.extra} />
            </p>
            <ImageNote className="mt-8" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Values" title={about.values.title} />
          <ToConfirm>{about.values.note}</ToConfirm>
        </div>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {about.values.items.map((v, i) => (
            <Reveal as="li" key={v.title} delay={0.1 * i} className="rounded-3xl border border-border bg-card p-8">
              <span className="font-serif text-5xl font-light text-brass-deep/70">0{i + 1}</span>
              <h3 className="mt-6 font-serif text-3xl text-ink">{v.title}</h3>
              <p className="mt-3 text-lg text-slate-ink">
                <Ph text={v.body} />
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-sand/60">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
          <SectionHeading eyebrow="Trust" title={about.credentials.title} />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {about.credentials.items.map((c, i) => (
              <Reveal as="li" key={c.label} delay={0.1 * i} className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-8">
                <p className="text-sm font-semibold tracking-wide text-slate-ink uppercase">{c.label}</p>
                <p className="font-serif text-3xl text-ink">
                  <Ph text={c.value} />
                </p>
                {c.detail && <p className="text-base text-slate-ink">{c.detail}</p>}
                <div className="mt-auto pt-2">
                  <ToConfirm>{c.status}</ToConfirm>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-8 text-lg text-slate-ink">
            Brands and suppliers: <Ph text={about.brands} />
          </Reveal>
        </div>
      </section>

      <CtaBand {...home.finalCta} />
    </>
  );
}
