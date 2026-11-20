"use client";

import { AlertTriangle, Check, CircleAlert, CircleCheck, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  tradeLabel,
  type CoverageFilter,
  type Tone,
  type TradeStatus,
} from "@/content/dashboard-data";
import { cn } from "@/lib/utils";

export const toneMeta: Record<
  Tone,
  { label: string; Icon: LucideIcon; chip: string; text: string; bar: string }
> = {
  red: {
    label: "Missing or late",
    Icon: CircleAlert,
    chip: "border-[#7a1f18] bg-[#fde8e4] text-[#7a1f18]",
    text: "text-[#7a1f18]",
    bar: "border-[#7a1f18] bg-[#8d2e24] text-white",
  },
  yellow: {
    label: "Needs a look",
    Icon: AlertTriangle,
    chip: "border-[#6d4a10] bg-[#f8efd4] text-[#6d4a10]",
    text: "text-[#6d4a10]",
    bar: "border-[#6d4a10] bg-[#e7c56a] text-[#3f2a08]",
  },
  green: {
    label: "On hand or done",
    Icon: CircleCheck,
    chip: "border-[#145c34] bg-[#e5f4ea] text-[#145c34]",
    text: "text-[#145c34]",
    bar: "border-[#145c34] bg-[#1e6a40] text-white",
  },
};

export function toneTextClass(tone: Tone) {
  return toneMeta[tone].text;
}

export function StatusPill({ tone, label, nowrap = false }: { tone: Tone; label?: string; nowrap?: boolean }) {
  const meta = toneMeta[tone];
  const Icon = meta.Icon;
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-full border-2 px-3 py-1.5 font-semibold",
        nowrap && "whitespace-nowrap [overflow-wrap:normal]",
        meta.chip,
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden />
      <span>{label ?? meta.label}</span>
    </span>
  );
}

export function ColorKey({ compact = false }: { compact?: boolean }) {
  return (
    <ul aria-label="Color key" className={cn("grid gap-2", compact ? "" : "sm:grid-cols-3")}>
      {(Object.keys(toneMeta) as Tone[]).map((tone) => {
        const meta = toneMeta[tone];
        const Icon = meta.Icon;
        const sentence =
          tone === "red"
            ? "Red means missing or late"
            : tone === "yellow"
              ? "Yellow means it needs a look"
              : "Green means it is on hand or done";
        return (
          <li key={tone} className={cn("flex items-center gap-2 rounded-2xl border-2 px-3 py-2 font-semibold", meta.chip)}>
            <Icon className="size-5 shrink-0" aria-hidden />
            <span>{compact ? meta.label : sentence}</span>
          </li>
        );
      })}
    </ul>
  );
}

const chartSegments: { status: TradeStatus; tone: Tone }[] = [
  { status: "covered", tone: "green" },
  { status: "partial", tone: "yellow" },
  { status: "none", tone: "red" },
];

export function CoverageChart({
  counts,
  selected,
  onSelect,
  hrefFor,
}: {
  counts: Record<TradeStatus, number>;
  selected?: CoverageFilter;
  onSelect?: (status: TradeStatus) => void;
  hrefFor?: (status: TradeStatus) => string;
}) {
  return (
    <div className="grid gap-3">
      <div className="flex h-4 overflow-hidden rounded-full bg-sand" aria-hidden>
        {chartSegments.map((segment) =>
          counts[segment.status] > 0 ? (
            <div
              key={segment.status}
              className={toneMeta[segment.tone].bar}
              style={{ flexGrow: counts[segment.status] }}
            />
          ) : null,
        )}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row" role="group" aria-label="Trade coverage">
        {chartSegments.map((segment) => {
          const meta = toneMeta[segment.tone];
          const Icon = meta.Icon;
          const label = `${tradeLabel(segment.status)}: ${counts[segment.status]}`;
          const pressed = selected === segment.status;
          const className = cn(
            "tap inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 px-3 text-center font-semibold sm:min-w-[8rem] sm:flex-1",
            meta.bar,
            pressed && "outline outline-4 outline-offset-2 outline-ink",
          );
          const style = { flexGrow: Math.max(counts[segment.status], 1) };
          const inner = (
            <>
              <Icon className="size-5 shrink-0" aria-hidden />
              <span>{label}</span>
            </>
          );
          if (hrefFor) {
            return (
              <Link key={segment.status} href={hrefFor(segment.status)} className={className} style={style} aria-current={pressed ? "page" : undefined}>
                {inner}
              </Link>
            );
          }
          return (
            <button
              key={segment.status}
              type="button"
              className={className}
              style={style}
              aria-pressed={pressed}
              onClick={() => onSelect?.(segment.status)}
            >
              {inner}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function FilterGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "tap inline-flex items-center gap-2 rounded-full border-2 px-4 font-semibold",
              selected ? "border-ink bg-ink text-bone" : "border-control bg-bone text-ink",
            )}
          >
            {selected ? <Check className="size-5" aria-hidden /> : null}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function ToneChooser({
  name,
  value,
  onChange,
}: {
  name: string;
  value: Tone;
  onChange: (tone: Tone) => void;
}) {
  return (
    <fieldset className="mt-3">
      <legend className="mb-2 font-semibold">Status</legend>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(toneMeta) as Tone[]).map((tone) => {
          const meta = toneMeta[tone];
          const Icon = meta.Icon;
          const selected = value === tone;
          return (
            <label
              key={tone}
              className={cn(
                "tap inline-flex cursor-pointer items-center gap-2 rounded-full border-2 px-3 font-semibold",
                selected ? meta.chip : "border-control bg-bone text-ink",
              )}
            >
              <input
                type="radio"
                name={name}
                value={tone}
                checked={selected}
                onChange={() => onChange(tone)}
                className="size-5"
              />
              <Icon className="size-5 shrink-0" aria-hidden />
              {meta.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ShowList<T>({
  items,
  getKey,
  render,
  empty,
}: {
  items: T[];
  getKey: (item: T) => string;
  render: (item: T) => ReactNode;
  empty: string;
}) {
  const [open, setOpen] = useState(false);
  if (items.length === 0) return <p>{empty}</p>;
  const visible = open ? items : items.slice(0, 5);
  return (
    <div>
      <ul className="grid gap-3">
        {visible.map((item) => (
          <li key={getKey(item)} className="rounded-2xl border-2 border-border bg-bone p-4">
            {render(item)}
          </li>
        ))}
      </ul>
      {items.length > 5 ? (
        <button
          type="button"
          className="tap mt-3 rounded-full border-2 border-ink px-4 font-semibold"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? "Show fewer" : `Show all (${items.length})`}
        </button>
      ) : null}
    </div>
  );
}

export function Panel({
  id,
  title,
  intro,
  tone,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  tone?: Tone;
  children: ReactNode;
}) {
  const meta = tone ? toneMeta[tone] : null;
  const Icon = meta?.Icon;
  return (
    <section
      aria-labelledby={`${id}-heading`}
      id={id}
      className={cn("rounded-3xl border-2 bg-card p-5 md:p-6", meta ? cn(meta.chip, "bg-card") : "border-border")}
    >
      <h2 id={`${id}-heading`} className={cn(Icon && "flex items-center gap-2")}>
        {Icon ? <Icon className="size-7 shrink-0" aria-hidden /> : null}
        {title}
      </h2>
      {intro ? <p className="mt-2 max-w-[44rem]">{intro}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}
