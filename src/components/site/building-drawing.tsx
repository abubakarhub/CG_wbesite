"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Abstract line drawing of a four-story building. Illustrative only. */
export function BuildingDrawing({ className, floors = 4 }: { className?: string; floors?: number }) {
  const w = 420;
  const floorH = 62;
  const top = 60;
  const left = 40;
  const h = floors * floorH;
  const cols = 7;
  const colW = (w - 2 * left) / cols;

  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  const lines: { d: string; delay: number; strong?: boolean }[] = [];
  lines.push({ d: `M${left} ${top + h} V${top} H${w - left} V${top + h}`, delay: 0, strong: true });
  lines.push({ d: `M${left - 24} ${top + h} H${w - left + 24}`, delay: 0.1, strong: true });
  lines.push({ d: `M${left - 10} ${top} H${w - left + 10}`, delay: 0.3, strong: true });
  for (let f = 1; f < floors; f++) {
    lines.push({ d: `M${left} ${top + f * floorH} H${w - left}`, delay: 0.4 + f * 0.12 });
  }
  for (let f = 0; f < floors; f++) {
    for (let c = 0; c < cols; c++) {
      const x = left + c * colW + colW * 0.22;
      const y = top + f * floorH + floorH * 0.24;
      const ww = colW * 0.56;
      const wh = floorH * 0.52;
      lines.push({
        d: `M${x} ${y} H${x + ww} V${y + wh} H${x} Z`,
        delay: 0.8 + (floors - f) * 0.1 + c * 0.04,
      });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${top + h + 40}`}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Illustration: line drawing of a four-story building (not a photo)"
      fill="none"
    >
      {lines.map((l, i) => (
        <motion.path
          key={i}
          d={l.d}
          stroke="currentColor"
          strokeWidth={l.strong ? 2 : 1.1}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={l.strong ? "text-brass" : "text-white/45"}
          {...draw(l.delay)}
        />
      ))}
      <motion.text
        x={w - left}
        y={top - 16}
        textAnchor="end"
        className="fill-white/50 font-sans text-[11px] tracking-[0.2em] uppercase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6 }}
      >
        {floors} stories
      </motion.text>
    </svg>
  );
}
