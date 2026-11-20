"use client";

import { useSyncExternalStore } from "react";
import { projects, type CustomItem, type JobStatus } from "@/content/dashboard-data";
import { DASHBOARD_STORAGE_KEY } from "./storage";

export type JobFile = {
  id: string;
  name: string;
  kind: "image" | "pdf";
  thumb?: string;
  size: number;
  addedAt: string;
};

export type LogEntry = {
  id: string;
  at: string;
  text: string;
  source: "voice" | "typed";
};

export type JobExtras = {
  status?: JobStatus;
  files: JobFile[];
  logs: LogEntry[];
  items: CustomItem[];
};

export type AllJobs = Record<string, JobExtras>;

const PREFIX = `${DASHBOARD_STORAGE_KEY}:job:`;
const EMPTY: JobExtras = { files: [], logs: [], items: [] };
const EMPTY_ALL: AllJobs = {};
const listeners = new Set<() => void>();
let cache: AllJobs = EMPTY_ALL;
let loaded = false;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function str(value: unknown): value is string {
  return typeof value === "string";
}

function parse(raw: string | null): JobExtras {
  if (!raw) return EMPTY;
  try {
    const data: unknown = JSON.parse(raw);
    if (!isRecord(data)) return EMPTY;
    const status =
      data.status === "on-track" || data.status === "watch" || data.status === "stuck" ? data.status : undefined;
    const files = (Array.isArray(data.files) ? data.files : []).filter(
      (f): f is JobFile =>
        isRecord(f) && str(f.id) && str(f.name) && (f.kind === "image" || f.kind === "pdf") && str(f.addedAt),
    );
    const logs = (Array.isArray(data.logs) ? data.logs : []).filter(
      (l): l is LogEntry => isRecord(l) && str(l.id) && str(l.at) && str(l.text),
    );
    const items = (Array.isArray(data.items) ? data.items : []).filter(
      (i): i is CustomItem => isRecord(i) && str(i.id) && str(i.title) && typeof i.onHand === "boolean",
    );
    return { status, files, logs, items };
  } catch {
    return EMPTY;
  }
}

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const next: AllJobs = {};
  for (const project of projects) {
    try {
      next[project.id] = parse(localStorage.getItem(PREFIX + project.id));
    } catch {
      next[project.id] = EMPTY;
    }
  }
  cache = next;
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getAll() {
  ensureLoaded();
  return cache;
}

function getServerAll() {
  return EMPTY_ALL;
}

export function jobOf(all: AllJobs, projectId: string): JobExtras {
  return all[projectId] ?? EMPTY;
}

/** Returns false when the browser refuses to store the change (usually a full quota). */
export function updateJob(projectId: string, change: (job: JobExtras) => JobExtras): boolean {
  ensureLoaded();
  const next = change(jobOf(cache, projectId));
  try {
    localStorage.setItem(PREFIX + projectId, JSON.stringify(next));
  } catch {
    return false;
  }
  cache = { ...cache, [projectId]: next };
  emit();
  return true;
}

export function resetJobs() {
  try {
    for (const project of projects) localStorage.removeItem(PREFIX + project.id);
  } catch {
    // The in-memory reset below still restores the sample defaults.
  }
  cache = {};
  for (const project of projects) cache[project.id] = EMPTY;
  emit();
}

export function useAllJobs(): AllJobs {
  return useSyncExternalStore(subscribe, getAll, getServerAll);
}

export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
