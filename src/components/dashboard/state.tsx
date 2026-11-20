"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { blockers, decisions, type Tone } from "@/content/dashboard-data";
import {
  clearPersisted,
  defaultPersisted,
  readPersisted,
  writePersisted,
  type PersistedDashboard,
  type TextSize,
} from "./storage";

type DashboardApi = {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  isChecked: (id: string, fallback?: boolean) => boolean;
  setChecked: (id: string, done: boolean) => void;
  blockerTone: (id: string) => Tone;
  setBlockerTone: (id: string, tone: Tone) => void;
  decisionTone: (id: string) => Tone;
  setDecisionTone: (id: string, tone: Tone) => void;
  blockerTones: Record<string, Tone>;
  decisionTones: Record<string, Tone>;
  phaseDone: (id: string, fallback: boolean) => boolean;
  setPhaseDone: (id: string, done: boolean) => void;
  reset: () => void;
};

const DashboardContext = createContext<DashboardApi | null>(null);
const listeners = new Set<() => void>();
let memory: PersistedDashboard = defaultPersisted;
let loaded = false;

function emit() {
  for (const listener of listeners) listener();
}

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const stored = readPersisted();
  if (stored) memory = stored;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  ensureLoaded();
  return memory;
}

function getServerSnapshot() {
  return defaultPersisted;
}

function commit(next: PersistedDashboard) {
  memory = next;
  writePersisted(next);
  emit();
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const api: DashboardApi = {
    textSize: state.textSize,
    setTextSize: (textSize) => commit({ ...memory, textSize }),
    isChecked: (id, fallback = false) => state.checks[id] ?? fallback,
    setChecked: (id, done) => commit({ ...memory, checks: { ...memory.checks, [id]: done } }),
    blockerTone: (id) => state.blockerTones[id] ?? blockers.find((row) => row.id === id)?.statusTone ?? "yellow",
    setBlockerTone: (id, tone) =>
      commit({ ...memory, blockerTones: { ...memory.blockerTones, [id]: tone } }),
    decisionTone: (id) => state.decisionTones[id] ?? decisions.find((row) => row.id === id)?.statusTone ?? "yellow",
    setDecisionTone: (id, tone) =>
      commit({ ...memory, decisionTones: { ...memory.decisionTones, [id]: tone } }),
    blockerTones: state.blockerTones,
    decisionTones: state.decisionTones,
    phaseDone: (id, fallback) => state.phases[id] ?? fallback,
    setPhaseDone: (id, done) => commit({ ...memory, phases: { ...memory.phases, [id]: done } }),
    reset: () => {
      clearPersisted();
      memory = defaultPersisted;
      emit();
    },
  };

  return <DashboardContext.Provider value={api}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const value = useContext(DashboardContext);
  if (!value) throw new Error("useDashboard must be used inside DashboardProvider");
  return value;
}
