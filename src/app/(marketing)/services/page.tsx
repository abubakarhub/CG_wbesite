import type { Metadata } from "next";
import { DrawLine, Reveal } from "@/components/site/motion";
import { Ph } from "@/components/site/ph";
import { CtaBand, PageHero, SectionHeading, ToConfirm } from "@/components/site/sections";
import { ServiceIcon } from "@/components/site/service-icon";
import { home, images, services } from "@/content/site";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHero {...services.intro} image={images.framing}>
        <div className="mt-8">
          <ToConfirm light>{services.status}</ToConfirm>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <ol className="grid gap-6">
          {services.items.map((s, i) => (
            <Reveal
              as="li"
              key={s.key}
              id={s.key}
              className="group grid scroll-mt-32 gap-8 rounded-[2rem] border border-border bg-card p-8 transition-shadow duration-500 hover:shadow-[0_30px_60px_-35px_rgba(18,21,26,0.35)] md:grid-cols-[auto_1fr_auto] md:items-center md:p-12"
            >
              <div className="flex items-center gap-6">
                <span className="font-serif text-6xl font-light text-brass-deep/70 md:text-7xl">0{i + 1}</span>
                <span className="grid size-16 place-items-center rounded-2xl bg-ink text-brass transition-transform duration-500 group-hover:-rotate-6">
                  <ServiceIcon name={s.icon} className="size-8" />
                </span>
              </div>
              <div>
                <h2 className="font-serif text-4xl text-ink md:text-5xl">{s.title}</h2>
                <p className="mt-3 text-xl text-ink/85">{s.summary}</p>
                <p className="mt-3 text-lg text-slate-ink">
                  <Ph text={s.details} />
                </p>
              </div>
              <ToConfirm>To confirm</ToConfirm>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="on-dark bg-ink text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading light eyebrow={services.process.eyebrow} title={services.process.title} />
            <ToConfirm light>{services.process.note}</ToConfirm>
          </div>
          <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            {services.process.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={0.12 * i}>
                <span className="text-sm font-semibold tracking-[0.2em] text-brass uppercase">Step {i + 1}</span>
                <DrawLine className="mt-4 text-white/25" />
                <h3 className="mt-6 font-serif text-3xl">{step.title}</h3>
                <p className="mt-3 text-lg text-white/75">
                  <Ph text={step.body} />
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand {...home.finalCta} />
    </>
  );
}
