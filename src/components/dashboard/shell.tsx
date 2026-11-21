"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { effectiveProject, projectToneLabel, projects } from "@/content/dashboard-data";
import { cn } from "@/lib/utils";
import { jobOf, useAllJobs } from "./job-store";
import { ToastProvider } from "./toasts";
import { ColorKey, toneTextClass } from "./ui";

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
    <nav aria-label="Jobs" className="grid grid-cols-2 gap-2 p-3 lg:sticky lg:top-0 lg:flex lg:flex-col">
      {links.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "tap flex flex-col items-start justify-center gap-0.5 rounded-2xl border px-3 py-2 text-left font-semibold transition-colors lg:w-full",
              active ? "border-ink bg-ink text-bone" : "border-border bg-card text-ink hover:border-brass-deep/50",
            )}
          >
            <span>{item.label}</span>
            <span className={cn("text-[0.85em]", active ? "text-bone/80" : !item.tone ? "text-slate-ink" : toneTextClass(item.tone))}>
              {item.detail}
            </span>
          </Link>
        );
      })}
      <div className="mt-2 hidden w-full lg:block">
        <ColorKey compact />
      </div>
    </nav>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="dash-shell min-h-dvh">
      <div className="lg:grid lg:grid-cols-[17.5rem_minmax(0,1fr)]">
        <aside className="border-b border-border lg:border-r lg:border-b-0">
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
