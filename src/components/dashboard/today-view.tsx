"use client";

import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import {
  checklist,
  collectFacts,
  colorHelp,
  countTones,
  customItemFacts,
  demoTodayLabel,
  doneThisWeekCount,
  effectiveProject,
  needsAttention,
  onSchedulePercent,
  phaseProgress,
  projects,
  scheduleLabel,
  scheduleTone,
  todayBottomLine,
  type Project,
} from "@/content/dashboard-data";
import { JobProgressChart, KpiCard, ScheduleChart } from "./charts";
import { jobOf, useAllJobs } from "./job-store";
import { useDashboard } from "./state";
import { ColorKey, Panel, StatusPill } from "./ui";

type JobRow = {
  project: Project;
  done: number;
  total: number;
  percent: number;
  missing: number;
  onHand: number;
};

function JobsOverview({ rows }: { rows: JobRow[] }) {
  return (
    <>
      <ul className="grid gap-3 min-[1400px]:hidden">
        {rows.map((row) => (
          <li key={row.project.id}>
            <Link
              href={`/dashboard/${row.project.id}`}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-bone p-4 transition-colors hover:border-brass-deep/50"
            >
              <span className="dash-title">{row.project.name}</span>
              <span className="flex flex-wrap gap-2">
                <StatusPill tone={scheduleTone(row.project.schedule)} label={scheduleLabel(row.project.schedule)} />
                <StatusPill tone="red" label={`${row.missing} missing`} />
                <StatusPill tone="green" label={`${row.onHand} on hand`} />
              </span>
              <span>
                {row.project.phase} · {row.percent}% done ({row.done} of {row.total} steps)
              </span>
              <span>
                <span className="font-semibold">Next step: </span>
                {row.project.nextStep}
              </span>
              <span className="inline-flex items-center gap-2 font-semibold underline">
                Open this job
                <ArrowRight className="size-5" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div
        className="hidden overflow-x-auto min-[1400px]:block"
        role="region"
        aria-label="Jobs overview table"
        tabIndex={0}
      >
        <table className="w-full border-collapse text-left [overflow-wrap:normal]">
          <caption className="sr-only">Jobs overview. Open a job to see its details.</caption>
          <thead>
            <tr className="border-b border-ink/30">
              <th scope="col" className="min-w-[10rem] p-3 font-semibold">Job</th>
              <th scope="col" className="p-3 font-semibold">Status</th>
              <th scope="col" className="p-3 font-semibold">Progress</th>
              <th scope="col" className="p-3 font-semibold">Missing / on hand</th>
              <th scope="col" className="min-w-[11rem] p-3 font-semibold">Next step</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.project.id} className="border-b border-border align-top">
                <th scope="row" className="p-3 text-left font-normal">
                  <Link
                    href={`/dashboard/${row.project.id}`}
                    className="tap dash-text-link inline-flex items-center gap-2 font-semibold"
                  >
                    {row.project.name}
                    <ArrowRight className="size-5 shrink-0" aria-hidden />
                  </Link>
                  <span className="block">{row.project.phase}</span>
                </th>
                <td className="p-3">
                  <StatusPill tone={scheduleTone(row.project.schedule)} label={scheduleLabel(row.project.schedule)} nowrap />
                </td>
                <td className="p-3 whitespace-nowrap">
                  <span className="font-semibold">{row.percent}%</span>
                  <span className="block">
                    {row.done} of {row.total} steps
                  </span>
                </td>
                <td className="p-3">
                  <span className="flex flex-col items-start gap-2">
                    <StatusPill tone="red" label={`${row.missing} missing`} nowrap />
                    <StatusPill tone="green" label={`${row.onHand} on hand`} nowrap />
                  </span>
                </td>
                <td className="p-3">
                  {row.project.nextStep}
                  <span className="block">Who: {row.project.nextStepOwner}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function TodayView() {
  const dash = useDashboard();
  const overrides = { blockerTones: dash.blockerTones, decisionTones: dash.decisionTones };
  const jobs = useAllJobs();
  const list = projects.map((project) => effectiveProject(project, jobOf(jobs, project.id).status));
  const factsFor = (project: Project) => [
    ...customItemFacts(project, jobOf(jobs, project.id).items),
    ...collectFacts(overrides, project.id),
  ];
  const facts = list.flatMap(factsFor);
  const counts = countTones(facts);
  const attention = needsAttention(facts, 5);
  const onSchedule = onSchedulePercent(list);
  const onScheduleJobs = list.filter((project) => project.schedule === "on-schedule").length;
  const weekDone = doneThisWeekCount(dash.phaseDone);
  const rows: JobRow[] = list.map((project) => {
    const jobCounts = countTones(factsFor(project));
    return { project, ...phaseProgress(project.id, dash.phaseDone), missing: jobCounts.red, onHand: jobCounts.green };
  });

  return (
    <div className="grid gap-8">
      <header className="grid gap-4">
        <p className="dash-kicker">{demoTodayLabel}</p>
        <h1>Overview</h1>
        <p className="dash-lead">{todayBottomLine(list)}</p>
      </header>

      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">
          Key numbers
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Active jobs"
            value={projects.length}
            detail="Sample jobs in this demo"
            icon={<Briefcase className="mt-0.5 size-6 shrink-0" aria-hidden />}
          />
          <KpiCard
            label="On track"
            value={`${onSchedule}%`}
            percent={onSchedule}
            detail={`${onScheduleJobs} of ${projects.length} jobs`}
          />
          <KpiCard label="Needs attention" value={counts.red} tone="red" detail="Things missing or late" />
          <KpiCard label="Done this week" value={weekDone} tone="green" detail="Job steps finished this sample week" />
        </ul>
      </section>

      <div className="grid gap-4">
        <section aria-labelledby="summary-heading" className="dash-card p-5 md:p-6">
          <h2 id="summary-heading" className="dash-title">
            Executive summary
          </h2>
          <ul className="mt-3 grid gap-3">
            {list.map((project) => (
              <li key={project.id} className="flex flex-wrap items-start gap-x-3 gap-y-1">
                <StatusPill tone={scheduleTone(project.schedule)} label={scheduleLabel(project.schedule)} />
                <span className="min-w-0 flex-1">
                  <span className="font-semibold">{project.name}:</span> {project.topFocus}.
                </span>
              </li>
            ))}
          </ul>
        </section>
        <p className="text-slate-ink">{colorHelp}</p>
        <ColorKey />
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <Panel id="progress" title="Progress per job" intro="How many job steps are done. Tick steps on a job page to move these bars.">
          <JobProgressChart rows={rows} />
        </Panel>
        <Panel id="schedule" title="Job status" intro="Which jobs are on track, worth watching, or stuck.">
          <ScheduleChart list={list} />
        </Panel>
      </div>

      <Panel id="jobs" title="Jobs overview" intro="Red means missing. Green means on hand. Open a job to see its steps, timeline, and next step.">
        <JobsOverview rows={rows} />
      </Panel>

      <Panel id="attention" title="Needs attention now" intro="The first things to look at. Open a row to see that job.">
        {attention.length === 0 ? (
          <p>Nothing needs attention in this demo right now.</p>
        ) : (
          <ul className="grid gap-3">
            {attention.map((fact) => (
              <li key={fact.id}>
                <Link
                  href={`/dashboard/${fact.projectId}`}
                  className="grid min-h-12 gap-2 rounded-2xl border border-border bg-bone p-4 transition-colors hover:border-brass-deep/50 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                >
                  <span>
                    <span className="block font-semibold">{fact.projectName}</span>
                    <span className="mt-1 block">{fact.title}</span>
                    <span className="mt-1 block">Who owns this: {fact.owner}</span>
                  </span>
                  <StatusPill tone={fact.tone} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel
        id="checklist"
        title="Today's checklist"
        intro="A suggested order for the day. Ticks stay on this browser."
      >
        <ul className="grid gap-3">
          {checklist.map((item) => {
            const done = dash.isChecked(item.id, item.done);
            return (
              <li key={item.id}>
                <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl border border-border bg-bone p-4">
                  <input
                    type="checkbox"
                    className="mt-0.5 size-5 shrink-0"
                    checked={done}
                    onChange={(event) => dash.setChecked(item.id, event.target.checked)}
                  />
                  <span>
                    <span className="font-semibold">{item.title}</span>
                    {done ? <span className="mt-1 block">Done for this demo.</span> : null}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}
