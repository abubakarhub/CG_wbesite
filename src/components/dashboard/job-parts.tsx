"use client";

import { ArrowRight, Check, CircleDot, Clock } from "lucide-react";
import {
  forProject,
  milestoneLabel,
  milestones,
  phases,
  type MilestoneState,
  type Project,
} from "@/content/dashboard-data";
import { cn } from "@/lib/utils";
import { useDashboard } from "./state";

export function NextStepCard({ project }: { project: Project }) {
  return (
    <section
      aria-labelledby="next-step-heading"
      className="rounded-3xl border-2 border-ink bg-ink p-5 text-bone md:p-6"
    >
      <h2 id="next-step-heading" className="flex items-center gap-2">
        <ArrowRight className="size-6 shrink-0" aria-hidden />
        Next step
      </h2>
      <p className="dash-lead mt-3 font-semibold">{project.nextStep}</p>
      <p className="mt-2">Who owns this: {project.nextStepOwner}</p>
    </section>
  );
}

export function PhaseChecklist({ projectId }: { projectId: string }) {
  const dash = useDashboard();
  const rows = forProject(phases, projectId);
  return (
    <ol className="grid gap-3">
      {rows.map((row, index) => {
        const done = dash.phaseDone(row.id, row.done);
        return (
          <li key={row.id}>
            <label
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border-2 p-4",
                done ? "border-[#145c34] bg-[#e5f4ea] text-[#145c34]" : "border-control bg-bone text-ink",
              )}
            >
              <input
                type="checkbox"
                className="size-7 shrink-0"
                checked={done}
                onChange={(event) => dash.setPhaseDone(row.id, event.target.checked)}
              />
              <span className="flex-1">
                <span className="font-semibold">
                  Step {index + 1}: {row.title}
                </span>
                <span className="block">{done ? "Done" : "Not done yet"}</span>
              </span>
            </label>
          </li>
        );
      })}
    </ol>
  );
}

const milestoneStyle: Record<MilestoneState, { dot: string; card: string; Icon: typeof Check }> = {
  done: { dot: "bg-[#1e6a40] text-white", card: "border-[#145c34] bg-[#e5f4ea] text-[#145c34]", Icon: Check },
  now: { dot: "bg-ink text-bone", card: "border-ink bg-card text-ink", Icon: CircleDot },
  next: { dot: "bg-[#e7c56a] text-[#3f2a08]", card: "border-[#6d4a10] bg-[#f8efd4] text-[#6d4a10]", Icon: Clock },
  later: { dot: "bg-sand text-ink", card: "border-control bg-bone text-ink", Icon: Clock },
};

export function Timeline({ projectId }: { projectId: string }) {
  const rows = forProject(milestones, projectId);
  return (
    <ol className="relative grid gap-4 border-l-4 border-control pl-6">
      {rows.map((row) => {
        const style = milestoneStyle[row.state];
        const Icon = style.Icon;
        return (
          <li key={row.id} className="relative">
            <span
              className={cn("absolute top-3 -left-[2.6rem] grid size-8 place-items-center rounded-full", style.dot)}
              aria-hidden
            >
              <Icon className="size-5" />
            </span>
            <div className={cn("rounded-2xl border-2 p-4", style.card)}>
              <p className="font-semibold">{row.label}</p>
              <p className="mt-1">
                {milestoneLabel(row.state)} · {row.whenLabel}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
