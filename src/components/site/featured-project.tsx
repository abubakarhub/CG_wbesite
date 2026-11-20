import { Camera, MapPin, Quote } from "lucide-react";
import { featuredProject } from "@/content/site";
import { BuildingDrawing } from "./building-drawing";
import { Counter, DrawLine, Reveal } from "./motion";
import { Ph } from "./ph";
import { Eyebrow, PrimaryButton, ToConfirm } from "./sections";

export function FeaturedProject({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="on-dark grain relative overflow-hidden bg-ink text-white" id="featured-project">
      <div className="blueprint-grid absolute inset-0 opacity-40" aria-hidden />
      <div className="absolute -right-40 top-20 size-[40rem] rounded-full bg-brass/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal>
            <Eyebrow light>{detailed ? "Case study" : "Featured project"}</Eyebrow>
            <h2 className="mt-5 font-serif text-6xl leading-none font-light tracking-tight md:text-8xl">
              {featuredProject.name}
            </h2>
            <p className="mt-5 flex items-center gap-2 text-lg text-white/80">
              <MapPin className="size-5 text-brass" aria-hidden />
              {featuredProject.address}
            </p>
            <div className="mt-5">
              <ToConfirm light>{featuredProject.approvalNote}</ToConfirm>
            </div>
          </Reveal>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-white/15 pt-8">
            {featuredProject.stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i}>
                <dt className="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">{s.label}</dt>
                <dd className="mt-2 font-serif text-5xl font-light text-white md:text-7xl">
                  <Counter value={s.value} plain={s.plain} />
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.2} className="mt-10 max-w-xl">
            <p className="text-xl leading-relaxed text-white/90">{featuredProject.safeLine}</p>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              <Ph text={detailed ? featuredProject.summary : featuredProject.roleNote} />
            </p>
            {detailed && (
              <p className="mt-3 text-lg leading-relaxed text-white/75">
                <Ph text={featuredProject.roleNote} />
              </p>
            )}
          </Reveal>

          {detailed && (
            <>
              <Reveal delay={0.1} className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-6">
                <Quote className="size-7 text-brass" aria-hidden />
                <p className="mt-3 font-serif text-2xl font-light italic">
                  <Ph text={featuredProject.quote} />
                </p>
                <p className="mt-3 text-sm text-white/60">
                  <Ph text="[Owner name]" />, General Contractor Co.
                </p>
              </Reveal>
              <ul className="mt-8 grid gap-3">
                {featuredProject.highlights.map((h, i) => (
                  <Reveal as="li" key={i} delay={0.08 * i} className="flex items-start gap-3 text-lg text-white/85">
                      <span className="mt-3 size-1.5 shrink-0 rounded-full bg-brass" aria-hidden />
                      <Ph text={h} />
                  </Reveal>
                ))}
              </ul>
            </>
          )}

          {!detailed && (
            <Reveal delay={0.3} className="mt-10">
              <PrimaryButton href="/portfolio" light>
                View the case study
              </PrimaryButton>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.15} y={40}>
          <figure className="relative rounded-[2rem] border border-white/15 bg-white/[0.03] p-6 backdrop-blur md:p-10">
            <div className="flex items-center justify-between text-xs tracking-[0.2em] text-white/60 uppercase">
              <span>{featuredProject.type}</span>
              <span>Completed 2024</span>
            </div>
            <DrawLine className="mt-4 text-white/20" />
            <BuildingDrawing className="mt-6" />
            <figcaption className="mt-6 flex items-center gap-3 rounded-xl border border-dashed border-brass/60 bg-brass/10 px-4 py-3 text-sm text-white/85">
              <Camera className="size-5 shrink-0 text-brass" aria-hidden />
              <span>
                Illustration only. <Ph text={featuredProject.photos} />
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
