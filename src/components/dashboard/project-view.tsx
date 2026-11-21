"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  blockers,
  collectFacts,
  colorHelp,
  countTones,
  coverageCounts,
  customItemFacts,
  deadlines,
  decisions,
  effectiveProject,
  files,
  forProject,
  jobStatusFromSchedule,
  phaseProgress,
  projectToneLabel,
  questions,
  scheduleLabel,
  scheduleTone,
  scriptedProjectAnswer,
  trades,
  vendors,
  type CoverageFilter,
  type Fact,
  type Project,
  type Tone,
} from "@/content/dashboard-data";
import { useDashboard } from "./state";
import { KpiCard } from "./charts";
import { NextStepCard, PhaseChecklist, Timeline } from "./job-parts";
import { jobOf, useAllJobs } from "./job-store";
import { AddItemForm, CustomItemToggle, DailyLog, FilesPanel, JobStatusButtons } from "./job-tools";
import { FileTable, QuestionList, TradeTable } from "./tables";
import { CoverageChart, Panel, ShowList, StatusPill, ToneChooser } from "./ui";

function orderedFacts(facts: Fact[], tone: Tone): Fact[] {
  const rank = { custom: -1, file: 0, trade: 1, question: 2, blocker: 3, decision: 4 };
  return facts.filter((fact) => fact.tone === tone).sort((a, b) => rank[a.kind] - rank[b.kind]);
}

function FactBody({ fact }: { fact: Fact }) {
  if (fact.kind === "custom") {
    return <CustomItemToggle projectId={fact.projectId} itemId={fact.id} title={fact.title} onHand={fact.tone === "green"} />;
  }
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3>{fact.title}</h3>
        <p className="mt-1">{fact.detail}</p>
        <p className="mt-1">Who owns this: {fact.owner}</p>
      </div>
      <StatusPill tone={fact.tone} />
    </div>
  );
}

function AskBox({ project, openBlockers }: { project: Project; openBlockers: { title: string; owner: string }[] }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) {
      setAnswer("");
      setHint("Type a question first.");
      return;
    }
    setHint("");
    setAnswer(scriptedProjectAnswer(project, openBlockers, trimmed));
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <label htmlFor="ask-question" className="font-semibold">
        Ask a question about this job
      </label>
      <input
        id="ask-question"
        name="question"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        className="tap w-full rounded-2xl border border-control bg-white px-4 text-ink"
        placeholder="Example: What should we do next?"
      />
      <button type="submit" className="tap w-fit rounded-full bg-ink px-5 font-semibold text-bone">
        Ask
      </button>
      <div aria-live="polite" aria-atomic="true">
        {hint ? <p className="font-semibold">{hint}</p> : null}
        {answer ? (
          <div className="rounded-2xl border border-dashed border-[#6d4a10] bg-[#f8efd4] p-4 text-[#3f2a08]">
            <p className="font-bold">Demo response — not connected to live files.</p>
            <p className="mt-2">{answer}</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}

export function ProjectView({ project: baseProject, initialCoverage }: { project: Project; initialCoverage: CoverageFilter }) {
  const dash = useDashboard();
  const extras = jobOf(useAllJobs(), baseProject.id);
  const project = effectiveProject(baseProject, extras.status);
  const status = extras.status ?? jobStatusFromSchedule(baseProject.schedule);
  const [coverage, setCoverage] = useState<CoverageFilter>(initialCoverage);
  const overrides = { blockerTones: dash.blockerTones, decisionTones: dash.decisionTones };
  const facts = [...customItemFacts(project, extras.items), ...collectFacts(overrides, project.id)];
  const counts = countTones(facts);
  const jobBlockers = forProject(blockers, project.id);
  const jobDecisions = forProject(decisions, project.id);
  const jobTrades = forProject(trades, project.id);
  const openBlockers = jobBlockers
    .map((row) => ({ ...row, tone: dash.blockerTone(row.id) }))
    .filter((row) => row.tone !== "green");
  const openDecisions = jobDecisions.filter((row) => dash.decisionTone(row.id) !== "green");
  const progress = phaseProgress(project.id, dash.phaseDone);

  useEffect(() => {
    if (initialCoverage === "all") return;
    document.getElementById("trades")?.scrollIntoView({ block: "start" });
  }, [initialCoverage]);

  return (
    <div className="grid gap-8">
      <header className="grid gap-4">
        <Link href="/dashboard" className="tap dash-text-link inline-flex w-fit items-center gap-2 font-semibold">
          <ArrowLeft className="size-5" aria-hidden />
          All jobs
        </Link>
        <h1>{project.name}</h1>
        <p>
          {project.location} · {project.type}
        </p>
        <div className="w-fit">
          <StatusPill tone={project.tone} label={`${project.phase} · ${projectToneLabel(project.tone)}`} />
        </div>
        <p className="dash-lead">{project.summary}</p>
        <p>Sample lead: {project.ownerName}</p>
        <p className="text-slate-ink">{colorHelp}</p>
        <p className="text-slate-ink">Changes save on this browser by themselves. Look for “Saved ✓”.</p>
      </header>

      <JobStatusButtons projectId={project.id} current={status} />

      <NextStepCard project={project} />

      <section aria-labelledby="job-numbers">
        <h2 id="job-numbers" className="sr-only">
          This job in numbers
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Progress"
            value={`${progress.percent}%`}
            percent={progress.percent}
            detail={`${progress.done} of ${progress.total} steps done`}
          />
          <KpiCard
            label="Status"
            value={scheduleLabel(project.schedule)}
            tone={scheduleTone(project.schedule)}
            detail={`Target: ${project.targetDateLabel}`}
          />
          <KpiCard label="Missing or late" value={counts.red} tone="red" detail={`${openBlockers.length} open blockers`} />
          <KpiCard label="On hand or done" value={counts.green} tone="green" detail={`${openDecisions.length} decisions waiting`} />
        </ul>
      </section>

      <div className="grid gap-8 xl:grid-cols-2">
        <Panel
          id="missing"
          title="What is missing or late"
          intro="Drawings, signatures, open trades, and questions that are not done."
          tone="red"
        >
          <AddItemForm projectId={project.id} />
          <ShowList
            items={orderedFacts(facts, "red")}
            getKey={(fact) => fact.id}
            empty="Nothing is missing or late on this sample job."
            render={(fact) => <FactBody fact={fact} />}
          />
        </Panel>

        <Panel id="on-hand" title="What we have" intro="Files, trades, and answers that are on hand or done." tone="green">
          <ShowList
            items={orderedFacts(facts, "green")}
            getKey={(fact) => fact.id}
            empty="Nothing is marked on hand yet."
            render={(fact) => <FactBody fact={fact} />}
          />
        </Panel>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <Panel id="phases" title="Job steps" intro="Tick a step when it is done. The progress numbers move with it.">
          <PhaseChecklist projectId={project.id} />
        </Panel>
        <Panel id="timeline" title="Timeline" intro="Sample weeks only. Dates that are not set say To be confirmed.">
          <Timeline projectId={project.id} />
        </Panel>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <Panel id="photos" title="Photos and files" intro="Add site photos or PDF files. They stay on this browser only.">
          <FilesPanel projectId={project.id} />
        </Panel>
        <Panel id="log" title="Daily log" intro="Say or type what happened today. Each note gets the date and time.">
          <DailyLog projectId={project.id} />
        </Panel>
      </div>

      <h2 className="border-t border-border pt-6">More detail</h2>

      <Panel id="blockers" title="Blockers and who owns them" intro="Change a status to try the demo. The choice stays on this browser.">
        <ShowList
          items={jobBlockers}
          getKey={(row) => row.id}
          empty="No blockers on this sample job."
          render={(row) => (
            <div>
              <h3>{row.title}</h3>
              <p className="mt-1">Who owns this: {row.owner}</p>
              <p>What it affects: {row.impact}</p>
              <ToneChooser name={`blocker-${row.id}`} value={dash.blockerTone(row.id)} onChange={(tone) => dash.setBlockerTone(row.id, tone)} />
            </div>
          )}
        />
      </Panel>

      <Panel id="decisions" title="Decisions waiting" intro="Choices that still need a person and a date.">
        <ShowList
          items={jobDecisions}
          getKey={(row) => row.id}
          empty="No decisions on this sample job."
          render={(row) => (
            <div>
              <h3>{row.title}</h3>
              <p className="mt-1">When: {row.dueLabel}</p>
              <p>Who owns this: {row.owner}</p>
              <ToneChooser
                name={`decision-${row.id}`}
                value={dash.decisionTone(row.id)}
                onChange={(tone) => dash.setDecisionTone(row.id, tone)}
              />
            </div>
          )}
        />
      </Panel>

      <Panel id="trades" title="Trade coverage" intro="No prices are shown. Filter the list, or use the colored blocks.">
        <div className="grid gap-4">
          <CoverageChart counts={coverageCounts(jobTrades)} selected={coverage} onSelect={setCoverage} />
          <TradeTable rows={jobTrades} filter={coverage} onFilter={setCoverage} />
        </div>
      </Panel>

      <Panel id="files" title="Files and drawings" intro="What is on hand, what needs an update, and what is missing.">
        <FileTable rows={forProject(files, project.id)} />
      </Panel>

      <Panel id="questions" title="Open questions" intro="Questions for this sample job. This is not a live mailbox.">
        <QuestionList rows={forProject(questions, project.id)} />
      </Panel>

      <Panel id="vendors" title="Vendors and trades" intro="Sample company names. Not real vendors.">
        <ul className="grid gap-3">
          {forProject(vendors, project.id).map((row) => (
            <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-bone p-4">
              <div>
                <h3>{row.name}</h3>
                <p className="mt-1">Work: {row.work}</p>
              </div>
              <StatusPill tone={row.statusTone} label={row.statusLabel} />
            </li>
          ))}
        </ul>
      </Panel>

      <Panel id="deadlines" title="Deadlines" intro="What is due, and what is still open. These are sample targets, not a client schedule.">
        <ul className="grid gap-3">
          {forProject(deadlines, project.id).map((row) => (
            <li key={row.id} className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-border bg-bone p-4">
              <div>
                <h3>{row.label}</h3>
                <p className="mt-1">When: {row.whenLabel}</p>
                <p>Still open: {row.openItems}</p>
              </div>
              <StatusPill tone={row.statusTone} />
            </li>
          ))}
        </ul>
      </Panel>

      <Panel id="ask" title="Ask a question" intro="Scripted demo answer for this job. It is not connected to live files.">
        <AskBox project={project} openBlockers={openBlockers} />
      </Panel>
    </div>
  );
}
