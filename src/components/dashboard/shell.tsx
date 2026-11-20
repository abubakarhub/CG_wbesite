"use client";

import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  demoDataLabel,
  effectiveProject,
  exampleDataLabel,
  projectToneLabel,
  projects,
} from "@/content/dashboard-data";
import { cn } from "@/lib/utils";
import { jobOf, resetJobs, useAllJobs } from "./job-store";
import { useDashboard } from "./state";
import { ToastProvider } from "./toasts";
import { ColorKey, toneTextClass } from "./ui";

const textSizes = [
  { id: "default", label: "Default" },
  { id: "large", label: "Large" },
  { id: "extra", label: "Extra large" },
] as const;

function JobNav() {
  const pathname = usePathname();
  const jobs = useAllJobs();
  const links = [
    { href: "/dashboard", label: "Overview", detail: "All jobs", tone: null },
    ...projects
      .map((project) => effectiveProject(project, jobOf(jobs, project.id).status))
      .map((project) => ({
        href: `/dashboard/${project.id}`,
        label: project.name,
        detail: projectToneLabel(project.tone),
        tone: project.tone,
      })),
  ];

  return (
    <nav aria-label="Jobs" className="grid grid-cols-2 gap-2 p-3 lg:flex lg:flex-col">
      {links.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "tap flex flex-col items-start justify-center gap-0.5 rounded-2xl border-2 px-3 py-2 text-left font-semibold lg:w-full",
              active ? "border-ink bg-ink text-bone" : "border-control bg-card text-ink",
            )}
          >
            <span>{item.label}</span>
            <span className={cn(active || !item.tone ? "" : toneTextClass(item.tone))}>{item.detail}</span>
          </Link>
        );
      })}
      <div className="mt-2 hidden w-full lg:block">
        <ColorKey compact />
      </div>
    </nav>
  );
}

function TextSizeControls({
  textSize,
  setTextSize,
}: {
  textSize: (typeof textSizes)[number]["id"];
  setTextSize: (size: (typeof textSizes)[number]["id"]) => void;
}) {
  return (
    <div role="group" aria-label="Text size" className="flex flex-wrap items-center gap-2">
      <span className="font-semibold">Text size</span>
      {textSizes.map((size) => (
        <button
          key={size.id}
          type="button"
          aria-pressed={textSize === size.id}
          onClick={() => setTextSize(size.id)}
          className={cn(
            "tap rounded-full border-2 px-4 font-semibold",
            textSize === size.id ? "border-ink bg-ink text-bone" : "border-control bg-card text-ink",
          )}
        >
          {size.label}
        </button>
      ))}
    </div>
  );
}

function BackLink() {
  return (
    <Link href="/portfolio" className="tap dash-text-link inline-flex items-center gap-2 font-semibold">
      <ArrowLeft className="size-5" aria-hidden />
      Back to main website
    </Link>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { textSize, setTextSize, reset } = useDashboard();
  const [confirming, setConfirming] = useState(false);
  const [notice, setNotice] = useState("");
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!confirming) return;
    confirmRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setConfirming(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirming]);

  return (
    <div className="dash-shell min-h-dvh" data-text-size={textSize}>
      <header className="z-40 border-b-2 border-border bg-bone px-4 py-3 lg:sticky lg:top-0">
        <div className="flex flex-wrap items-center gap-3">
          <div className="shrink-0">
            <p className="font-semibold">General Contractor Co.</p>
            <p className="dash-title whitespace-nowrap">Project dashboard</p>
          </div>
          <p className="dash-badge rounded-xl border-2 border-dashed border-[#7a1f18] bg-[#fde8e4] px-3 py-2 text-[#7a1f18]">
            {demoDataLabel}
          </p>
          <p className="dash-badge rounded-xl border-2 border-dashed border-[#6d4a10] bg-[#f8efd4] px-3 py-2 text-[#6d4a10]">
            {exampleDataLabel}
          </p>
          <div className="hidden flex-wrap items-center gap-2 lg:flex">
            <TextSizeControls textSize={textSize} setTextSize={setTextSize} />
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="tap inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 font-semibold"
            >
              <RotateCcw className="size-5" aria-hidden />
              Reset demo
            </button>
            <BackLink />
          </div>
        </div>
        <details className="mt-2 lg:hidden">
          <summary className="tap flex cursor-pointer items-center font-semibold">Text size and reset</summary>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <TextSizeControls textSize={textSize} setTextSize={setTextSize} />
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="tap inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 font-semibold"
            >
              <RotateCcw className="size-5" aria-hidden />
              Reset demo
            </button>
            <BackLink />
          </div>
        </details>
        {confirming ? (
          <div className="mt-3 rounded-2xl border-2 border-ink bg-card p-4" role="region" aria-labelledby="reset-title">
            <p id="reset-title" className="font-semibold">
              Reset this demo?
            </p>
            <p className="mt-1">This clears ticks, status changes, added items, photos, log notes, and text size saved in this browser.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                ref={confirmRef}
                type="button"
                className="tap rounded-full bg-ink px-4 font-semibold text-bone"
                onClick={() => {
                  reset();
                  resetJobs();
                  setConfirming(false);
                  setNotice("Demo reset. Checklist ticks, status changes, and text size were cleared on this browser.");
                }}
              >
                Yes, reset demo
              </button>
              <button
                type="button"
                className="tap rounded-full border-2 border-ink px-4 font-semibold"
                onClick={() => setConfirming(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
        {notice ? (
          <p role="status" className="mt-3 font-semibold">
            {notice}
          </p>
        ) : null}
      </header>
      <div className="lg:grid lg:grid-cols-[20rem_minmax(0,1fr)]">
        <aside className="border-b-2 border-border lg:border-r-2 lg:border-b-0">
          <Suspense fallback={<p className="p-4">Loading jobs.</p>}>
            <JobNav />
          </Suspense>
        </aside>
        <main id="main" className="min-w-0 px-4 py-6 md:px-8 md:py-8">
          <ToastProvider>{children}</ToastProvider>
        </main>
      </div>
    </div>
  );
}
