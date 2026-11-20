"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ImagePlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { featuredProject, portfolio } from "@/content/site";
import { cn } from "@/lib/utils";
import { BuildingDrawing } from "./building-drawing";
import { Ph } from "./ph";

type Filter = (typeof portfolio.filters)[number];

const cards = [
  { kind: "live" as const, title: featuredProject.name, category: featuredProject.category },
  ...portfolio.upcoming.map((u) => ({ kind: "upcoming" as const, ...u })),
];

export function PortfolioGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = cards.filter((c) => filter === "All" || c.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {portfolio.filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "relative rounded-full border px-5 py-2.5 text-base font-medium transition-colors",
              filter === f ? "border-ink text-bone" : "border-border bg-card text-ink hover:border-ink/40",
            )}
          >
            {filter === f && (
              <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
            )}
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((c, i) => (
            <motion.li
              layout
              key={`${c.kind}-${c.title}-${i}-${c.category}`}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {c.kind === "live" ? (
                <Link
                  href="#featured-project"
                  className="on-dark group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl bg-ink p-7 text-white transition-transform duration-500 hover:-translate-y-1.5"
                >
                  <div className="blueprint-grid absolute inset-0 opacity-50" aria-hidden />
                  <div className="relative flex items-center justify-between">
                    <span className="rounded-full bg-brass px-3 py-1 text-xs font-semibold tracking-wider text-ink uppercase">
                      Completed 2024
                    </span>
                    <ArrowUpRight className="size-6 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <BuildingDrawing className="relative mx-auto max-w-[85%] transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="relative">
                    <p className="text-sm text-white/65">{c.category} · {featuredProject.city}</p>
                    <h3 className="mt-1 font-serif text-3xl">{c.title}</h3>
                    <p className="mt-1 text-white/75">53 units · 4 stories</p>
                  </div>
                </Link>
              ) : (
                <div className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl border-2 border-dashed border-border bg-card/60 p-7 transition-colors hover:border-brass-deep/50">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,151,74,0.12),transparent_60%)]" aria-hidden />
                  <span className="relative w-fit rounded-full bg-sand px-3 py-1 text-xs font-semibold tracking-wider text-slate-ink uppercase">
                    Coming soon
                  </span>
                  <div className="relative grid place-items-center">
                    <span className="grid size-20 place-items-center rounded-full border border-dashed border-brass-deep/50 text-brass-deep transition-transform duration-500 group-hover:scale-110">
                      <ImagePlus className="size-8" aria-hidden />
                    </span>
                    <p className="mt-4 text-center text-sm text-slate-ink">
                      <Ph text={portfolio.upcomingNote} />
                    </p>
                  </div>
                  <div className="relative">
                    <p className="text-sm text-slate-ink">{c.category}</p>
                    <h3 className="mt-1 text-lg font-semibold text-ink">
                      <Ph text={c.title} />
                    </h3>
                  </div>
                </div>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
