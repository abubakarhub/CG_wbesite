"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { company, home, images } from "@/content/site";
import { Reveal, WordReveal } from "./motion";
import { Ph } from "./ph";
import { Eyebrow, ImageNote, PrimaryButton, SecondaryLink } from "./sections";

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const { hero } = home;

  return (
    <section ref={ref} data-hero className="on-dark grain relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-white">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image src={images.hero.src} alt={images.hero.alt} fill priority sizes="100vw" className="object-cover object-[70%_center]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" aria-hidden />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative mx-auto w-full max-w-7xl px-5 pt-40 pb-16 md:px-8 md:pb-24"
      >
        <Reveal delay={0.05}>
          <Eyebrow light>{hero.eyebrow}</Eyebrow>
        </Reveal>
        <h1 className="mt-6 font-serif text-[3.4rem] leading-[0.95] font-light tracking-tight sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          <WordReveal text="Cross Point" delay={0.15} />
          <br />
          <WordReveal text="Construction" delay={0.35} className="text-white/90 italic" />
        </h1>
        <Reveal delay={0.7}>
          <p className="mt-7 max-w-xl text-xl leading-relaxed text-white/85 md:text-2xl">{hero.sub}</p>
          <p className="mt-3 text-base text-white/70">
            <Ph text={company.tagline} />
          </p>
        </Reveal>
        <Reveal delay={0.85} className="mt-10 flex flex-wrap items-center gap-4">
          <PrimaryButton href={hero.primaryCta.href} light>
            {hero.primaryCta.label}
          </PrimaryButton>
          <SecondaryLink href={hero.secondaryCta.href} light>
            {hero.secondaryCta.label}
          </SecondaryLink>
        </Reveal>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <ImageNote />
          <motion.span
            className="hidden items-center gap-2 text-sm text-white/70 md:flex"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          >
            Scroll <ChevronDown className="size-4" />
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
