"use client";

import { CalendarClock } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  projects,
  scheduleLabel,
  scheduleTone,
  type Project,
  type ScheduleStatus,
  type Tone,
} from "@/content/dashboard-data";
import { cn } from "@/lib/utils";
import { StatusPill, toneMeta } from "./ui";

export function KpiCard({
  label,
  value,
  detail,
  tone,
  percent,
  icon,
}: {
  label: string;
  value: ReactNode;
  detail: string;
  tone?: Tone;
  percent?: number;
  icon?: ReactNode;
}) {
  const meta = tone ? toneMeta[tone] : null;
  const Icon = meta?.Icon;
  return (
    <li className={cn("flex flex-col gap-2.5 rounded-3xl border p-5 shadow-[0_16px_40px_-30px_rgba(18,21,26,0.35)]", meta ? meta.chip : "border-border bg-card text-ink")}>
      <p className="flex items-start gap-2 text-[0.92em] font-semibold">
        {Icon ? <Icon className="mt-0.5 size-5 shrink-0" aria-hidden /> : icon}
        <span>{label}</span>
      </p>
      <p className="dash-metric">{value}</p>
      {percent !== undefined ? (
        <div className="h-2 overflow-hidden rounded-full bg-white/80 ring-1 ring-current" aria-hidden>
          <div className="h-full rounded-full bg-current" style={{ width: `${percent}%` }} />
        </div>
      ) : null}
      <p className={cn("text-[0.92em]", !meta && "text-slate-ink")}>{detail}</p>
    </li>
  );
}

export function JobProgressChart({ rows }: { rows: { project: Project; done: number; total: number; percent: number }[] }) {
  return (
    <ul className="grid gap-4" aria-label="Progress per job">
      {rows.map(({ project, done, total, percent }) => {
        const tone = scheduleTone(project.schedule);
        return (
          <li key={project.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Link href={`/dashboard/${project.id}`} className="dash-text-link tap inline-flex items-center font-semibold">
                {project.name}
              </Link>
              <span className="font-semibold">
                {percent}% · {done} of {total} steps done
              </span>
            </div>
            <div className="mt-1.5 h-3.5 overflow-hidden rounded-full border border-border bg-bone" aria-hidden>
              <div className={cn("h-full", toneMeta[tone].bar)} style={{ width: `${percent}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const scheduleOrder: ScheduleStatus[] = ["on-schedule", "at-risk", "behind"];

export function ScheduleChart({ list = projects }: { list?: Project[] }) {
  const counts = scheduleOrder.map((status) => ({
    status,
    jobs: list.filter((project) => project.schedule === status),
  }));
  return (
    <div className="grid gap-4">
      <div className="flex h-3.5 overflow-hidden rounded-full border border-border bg-bone" aria-hidden>
        {counts.map(({ status, jobs }) =>
          jobs.length ? (
            <div key={status} className={toneMeta[scheduleTone(status)].bar} style={{ flexGrow: jobs.length }} />
          ) : null,
        )}
      </div>
      <ul className="grid gap-3" aria-label="Job status">
        {counts.map(({ status, jobs }) => (
          <li key={status} className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-bone p-3">
            <StatusPill tone={scheduleTone(status)} label={`${scheduleLabel(status)}: ${jobs.length}`} />
            <span>{jobs.length ? jobs.map((project) => project.name).join(", ") : "No jobs"}</span>
          </li>
        ))}
      </ul>
      <p className="flex items-start gap-2">
        <CalendarClock className="mt-0.5 size-5 shrink-0" aria-hidden />
        Set a job’s status with the three big buttons on its page.
      </p>
    </div>
  );
}
