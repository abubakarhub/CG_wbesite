"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type UndoToast = { id: number; message: string; onUndo: () => void };

type ToastApi = {
  saved: () => void;
  problem: (message: string) => void;
  undo: (message: string, onUndo: () => void) => void;
};

const ToastContext = createContext<ToastApi | null>(null);
const UNDO_MS = 10_000;

function UndoBar({ toast, onDone }: { toast: UndoToast; onDone: () => void }) {
  const [paused, setPaused] = useState(false);
  const [left, setLeft] = useState(UNDO_MS);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setLeft((current) => current - 250), 250);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    if (left <= 0) onDone();
  }, [left, onDone]);

  return (
    <div
      className="pointer-events-auto flex flex-wrap items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-bone shadow-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className="font-semibold">{toast.message}</span>
      <span className="w-28 tabular-nums">{paused ? "Paused" : `${Math.ceil(left / 1000)}s to undo`}</span>
      <button
        type="button"
        className="tap inline-flex items-center gap-2 rounded-full bg-bone px-4 font-semibold text-ink"
        onClick={() => {
          toast.onUndo();
          onDone();
        }}
      >
        <RotateCcw className="size-5" aria-hidden />
        Undo
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [savedAt, setSavedAt] = useState(0);
  const [problemText, setProblemText] = useState("");
  const [undoToast, setUndoToast] = useState<UndoToast | null>(null);
  const seq = useRef(0);

  useEffect(() => {
    if (!savedAt) return;
    const timer = window.setTimeout(() => setSavedAt(0), 2500);
    return () => window.clearTimeout(timer);
  }, [savedAt]);

  useEffect(() => {
    if (!problemText) return;
    const timer = window.setTimeout(() => setProblemText(""), 8000);
    return () => window.clearTimeout(timer);
  }, [problemText]);

  const saved = useCallback(() => {
    setProblemText("");
    setSavedAt(Date.now());
  }, []);
  const problem = useCallback((message: string) => {
    setSavedAt(0);
    setProblemText(message);
  }, []);
  const undo = useCallback((message: string, onUndo: () => void) => {
    seq.current += 1;
    setUndoToast({ id: seq.current, message, onUndo });
  }, []);
  const clearUndo = useCallback(() => setUndoToast(null), []);

  return (
    <ToastContext.Provider value={{ saved, problem, undo }}>
      {children}
      <div className="pointer-events-none fixed inset-x-3 bottom-3 z-50 flex flex-col items-end gap-2 sm:left-auto sm:max-w-md">
        <div role="status" aria-live="polite" className="flex flex-col items-end gap-2">
          {savedAt ? (
            <p className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[#145c34] bg-[#e5f4ea] px-4 py-2 font-semibold text-[#145c34] shadow-lg">
              Saved ✓
            </p>
          ) : null}
          {problemText ? (
            <p className="pointer-events-auto inline-flex items-center gap-2 rounded-2xl border border-[#7a1f18] bg-[#fde8e4] px-4 py-2 font-semibold text-[#7a1f18] shadow-lg">
              <TriangleAlert className="size-5 shrink-0" aria-hidden />
              {problemText}
            </p>
          ) : null}
          {undoToast ? <UndoBar key={undoToast.id} toast={undoToast} onDone={clearUndo} /> : null}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToasts() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToasts must be used inside ToastProvider");
  return value;
}
