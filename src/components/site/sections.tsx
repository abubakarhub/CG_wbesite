import { ArrowRight, Check, CircleAlert, Clock } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { imagePlaceholderNote, type StatusTone } from "@/content/site";
import { cn } from "@/lib/utils";
import { Magnetic, ParallaxImage, Reveal, WordReveal } from "./motion";
import { Ph } from "./ph";

export function PageHero({
  eyebrow,
  title,
  sub,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  image?: { src: string; alt: string };
  children?: ReactNode;
}) {
  return (
    <section className="on-dark grain relative overflow-hidden bg-ink text-white">
      {image && (
        <>
          <ParallaxImage src={image.src} alt={image.alt} className="absolute inset-0" priority strength={60} />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/55" aria-hidden />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/80 to-transparent" aria-hidden />
        </>
      )}
      {!image && <div className="blueprint-grid absolute inset-0 opacity-50" aria-hidden />}
      <div className="relative mx-auto max-w-7xl px-5 pt-44 pb-20 md:px-8 md:pt-52 md:pb-28">
        <Reveal>
          <Eyebrow light>{eyebrow}</Eyebrow>
        </Reveal>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.02] font-light tracking-tight text-balance md:text-7xl">
          <WordReveal text={title} delay={0.1} />
        </h1>
        <Reveal delay={0.35}>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/80 md:text-2xl">
            <Ph text={sub} />
          </p>
        </Reveal>
        {children ? <div>{children}</div> : null}
        {image && <ImageNote className="mt-10" />}
      </div>
    </section>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold tracking-[0.28em] uppercase",
        light ? "text-brass" : "text-brass-deep",
      )}
    >
      <span className={cn("h-px w-8", light ? "bg-brass" : "bg-brass-deep")} aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  light = false,
  className,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-4 max-w-3xl font-serif text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-6xl",
          light ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {sub && (
        <p className={cn("mt-5 max-w-2xl text-lg md:text-xl", light ? "text-white/75" : "text-slate-ink")}>
          <Ph text={sub} />
        </p>
      )}
    </Reveal>
  );
}

export function ToConfirm({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1 text-xs font-semibold tracking-wide uppercase",
        light ? "border-brass text-brass" : "border-warn text-brass-deep",
      )}
    >
      <Clock className="size-3.5" aria-hidden />
      {children}
    </span>
  );
}

export function ImageNote({ className, light = true }: { className?: string; light?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs",
        light ? "bg-black/40 text-white/85 backdrop-blur" : "bg-sand text-slate-ink",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-brass" aria-hidden />
      {imagePlaceholderNote}
    </p>
  );
}

const toneStyles: Record<StatusTone, { label: string; cls: string; dot: string; Icon: typeof Check }> = {
  done: { label: "Done", cls: "bg-ok/12 text-ok border-ok/30", dot: "bg-ok", Icon: Check },
  progress: { label: "In progress", cls: "bg-warn/12 text-warn border-warn/30", dot: "bg-warn", Icon: Clock },
  blocked: { label: "Needs attention", cls: "bg-bad/10 text-bad border-bad/30", dot: "bg-bad", Icon: CircleAlert },
};

export function StatusPill({ tone, label, className }: { tone: StatusTone; label?: string; className?: string }) {
  const s = toneStyles[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold whitespace-nowrap",
        s.cls,
        className,
      )}
    >
      <s.Icon className="size-4" aria-hidden />
      {label ?? s.label}
    </span>
  );
}

export function toneDot(tone: StatusTone) {
  return toneStyles[tone].dot;
}

export function PrimaryButton({
  href,
  children,
  light = false,
  className,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Magnetic>
      <Link
        href={href}
        className={cn(
          "group inline-flex items-center gap-3 rounded-full py-4 pr-4 pl-7 text-lg font-semibold transition-colors",
          light ? "bg-white text-ink hover:bg-brass" : "bg-ink text-bone hover:bg-ink-2",
          className,
        )}
      >
        {children}
        <span
          className={cn(
            "grid size-9 place-items-center rounded-full transition-transform group-hover:translate-x-0.5",
            light ? "bg-ink text-white" : "bg-brass text-ink",
          )}
        >
          <ArrowRight className="size-5" />
        </span>
      </Link>
    </Magnetic>
  );
}

export function SecondaryLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border px-6 py-4 text-lg font-medium transition-colors",
        light ? "border-white/35 text-white hover:bg-white/10" : "border-ink/25 text-ink hover:bg-sand",
      )}
    >
      {children}
      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function CtaBand({ title, sub, cta }: { title: string; sub: string; cta: { label: string; href: string } }) {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <Reveal className="on-dark grain relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center text-white md:px-16 md:py-24">
        <div className="blueprint-grid absolute inset-0 opacity-60" aria-hidden />
        <div
          className="absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brass/20 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-serif text-4xl font-light tracking-tight text-balance md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/75 md:text-xl">{sub}</p>
          <div className="mt-10 flex justify-center">
            <PrimaryButton href={cta.href} light>
              {cta.label}
            </PrimaryButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
