import { ArrowUpRight, BadgeCheck, Bot, LayoutDashboard, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { HomeHero } from "@/components/site/home-hero";
import { ParallaxImage, Reveal } from "@/components/site/motion";
import { Ph } from "@/components/site/ph";
import { CtaBand, ImageNote, SecondaryLink, SectionHeading, ToConfirm } from "@/components/site/sections";
import { ServiceIcon } from "@/components/site/service-icon";
import { FeaturedProject } from "@/components/site/featured-project";
import { demosTeaser, home, images, services } from "@/content/site";

const trustIcons = [ShieldCheck, BadgeCheck, MapPin];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section aria-label="Credentials" className="border-b border-border bg-card">
        <ul className="mx-auto grid max-w-7xl divide-y divide-border px-5 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8">
          {home.trust.map((t, i) => {
            const Icon = trustIcons[i];
            return (
              <Reveal as="li" key={t.title} delay={0.08 * i} className="flex items-start gap-4 py-8 md:px-8 md:first:pl-0">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sand text-brass-deep">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-ink">{t.title}</p>
                    <p className="mt-1 text-base text-slate-ink">
                      <Ph text={t.detail} />
                    </p>
                    {t.status && (
                      <div className="mt-2">
                        <ToConfirm>{t.status}</ToConfirm>
                      </div>
                    )}
                  </div>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <FeaturedProject />

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={home.servicesIntro.eyebrow}
            title={home.servicesIntro.title}
          />
          <Reveal>
            <ToConfirm>{services.status}</ToConfirm>
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.items.map((s, i) => (
            <Reveal as="li" key={s.key} delay={0.1 * i}>
                <Link
                  href={`/services#${s.key}`}
                  className="group relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/30 hover:shadow-[0_30px_60px_-30px_rgba(18,21,26,0.35)]"
                >
                  <span className="absolute -top-6 -right-2 font-serif text-[8rem] leading-none font-light text-sand transition-colors group-hover:text-brass/25" aria-hidden>
                    0{i + 1}
                  </span>
                  <span className="relative grid size-14 place-items-center rounded-2xl bg-ink text-brass transition-transform duration-500 group-hover:rotate-[-6deg]">
                    <ServiceIcon name={s.icon} className="size-7" />
                  </span>
                  <div className="relative mt-10">
                    <h3 className="font-serif text-3xl text-ink">{s.title}</h3>
                    <p className="mt-2 text-lg text-slate-ink">{s.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-ink">
                      Learn more
                      <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-sand/60">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-2">
          <Reveal y={40} className="relative">
            <ParallaxImage
              src={images.blueprints.src}
              alt={images.blueprints.alt}
              className="aspect-[4/5] rounded-[2rem] md:aspect-[4/3.6]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <ImageNote className="absolute bottom-4 left-4" />
          </Reveal>
          <div>
            <SectionHeading eyebrow={home.aboutTeaser.eyebrow} title={home.aboutTeaser.title} />
            <Reveal delay={0.15}>
              <p className="mt-6 text-xl leading-relaxed text-slate-ink">
                <Ph text={home.aboutTeaser.body} />
              </p>
              <p className="mt-4 text-lg text-slate-ink">
                {home.aboutTeaser.line}
              </p>
              <div className="mt-10">
                <SecondaryLink href={home.aboutTeaser.cta.href}>{home.aboutTeaser.cta.label}</SecondaryLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading eyebrow={demosTeaser.eyebrow} title={demosTeaser.title} sub={demosTeaser.sub} />
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {demosTeaser.items.map((d, i) => {
            const Icon = d.icon === "bot" ? Bot : LayoutDashboard;
            return (
              <Reveal as="li" key={d.href} delay={0.1 * i}>
                <Link
                  href={d.href}
                  target={d.newTab ? "_blank" : undefined}
                  rel={d.newTab ? "noopener noreferrer" : undefined}
                  className="on-dark group relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl bg-ink p-8 text-white transition-transform duration-500 hover:-translate-y-1.5 md:p-10"
                >
                  <div className="blueprint-grid absolute inset-0 opacity-40" aria-hidden />
                  <div className="relative flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-brass/20 text-brass">
                      <Icon className="size-7" aria-hidden />
                    </span>
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase">
                      Demo
                    </span>
                  </div>
                  <div className="relative">
                    <h3 className="font-serif text-3xl md:text-4xl">{d.title}</h3>
                    <p className="mt-3 text-lg text-white/75">{d.body}</p>
                    <span className="mt-6 inline-flex min-h-12 items-center gap-1.5 font-semibold text-brass">
                      {d.cta}
                      {d.newTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
                      <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <CtaBand {...home.finalCta} />
    </>
  );
}
