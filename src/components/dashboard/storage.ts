import type { Tone } from "@/content/dashboard-data";

export const DASHBOARD_STORAGE_KEY = "gcco-dashboard-demo-v1";

export type TextSize = "default" | "large" | "extra";

export type PersistedDashboard = {
  textSize: TextSize;
  checks: Record<string, boolean>;
  blockerTones: Record<string, Tone>;
  decisionTones: Record<string, Tone>;
  phases: Record<string, boolean>;
};

export const defaultPersisted: PersistedDashboard = {
  textSize: "default",
  checks: {},
  blockerTones: {},
  decisionTones: {},
  phases: {},
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isTone(value: unknown): value is Tone {
  return value === "red" || value === "yellow" || value === "green";
}

function readTones(value: unknown): Record<string, Tone> {
  if (!isRecord(value)) return {};
  const tones: Record<string, Tone> = {};
  for (const [key, tone] of Object.entries(value)) {
    if (isTone(tone)) tones[key] = tone;
  }
  return tones;
}

function readChecks(value: unknown): Record<string, boolean> {
  if (!isRecord(value)) return {};
  const checks: Record<string, boolean> = {};
  for (const [key, done] of Object.entries(value)) {
    if (typeof done === "boolean") checks[key] = done;
  }
  return checks;
}

export function readPersisted(): PersistedDashboard | null {
  try {
    const raw = localStorage.getItem(DASHBOARD_STORAGE_KEY);
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    if (!isRecord(data)) return null;
    const textSize: TextSize =
      data.textSize === "large" || data.textSize === "extra" || data.textSize === "default"
        ? data.textSize
        : "default";
    return {
      textSize,
      checks: readChecks(data.checks),
      blockerTones: readTones(data.blockerTones),
      decisionTones: readTones(data.decisionTones),
      phases: readChecks(data.phases),
    };
  } catch {
    return null;
  }
}

export function writePersisted(state: PersistedDashboard) {
  try {
    localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private mode or a full disk should not block the demo for this visit.
  }
}

export function clearPersisted() {
  try {
    localStorage.removeItem(DASHBOARD_STORAGE_KEY);
  } catch {
    // Ignore. The in-memory reset still restores the defaults.
  }
}
