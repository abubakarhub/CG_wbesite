"use client";

import { Camera, Check, FileText, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState, useSyncExternalStore, type DragEvent, type FormEvent } from "react";
import { jobStatusOptions, type JobStatus } from "@/content/dashboard-data";
import { cn } from "@/lib/utils";
import { jobOf, newId, updateJob, useAllJobs, type JobFile, type LogEntry } from "./job-store";
import { useToasts } from "./toasts";

const FULL = "This browser is out of room. Remove a photo, then try again.";
const MAX_FILES = 12;
const THUMB_PX = 480;

function useSave(projectId: string) {
  const toast = useToasts();
  return (change: Parameters<typeof updateJob>[1]) => {
    const ok = updateJob(projectId, change);
    if (ok) toast.saved();
    else toast.problem(FULL);
    return ok;
  };
}

/* ---------- Job status ---------- */

const statusStyle: Record<JobStatus, { on: string; off: string }> = {
  "on-track": {
    on: "border-[#145c34] bg-[#1e6a40] text-white",
    off: "border-[#145c34] bg-[#e5f4ea] text-[#145c34]",
  },
  watch: {
    on: "border-[#6d4a10] bg-[#e7c56a] text-[#3f2a08]",
    off: "border-[#6d4a10] bg-[#f8efd4] text-[#6d4a10]",
  },
  stuck: {
    on: "border-[#7a1f18] bg-[#8d2e24] text-white",
    off: "border-[#7a1f18] bg-[#fde8e4] text-[#7a1f18]",
  },
};

export function JobStatusButtons({ projectId, current }: { projectId: string; current: JobStatus }) {
  const save = useSave(projectId);
  return (
    <section aria-labelledby="job-status-heading" className="grid gap-3">
      <h2 id="job-status-heading" className="dash-title">
        Job status
      </h2>
      <div role="group" aria-labelledby="job-status-heading" className="grid gap-3 sm:grid-cols-3">
        {jobStatusOptions.map((option) => {
          const pressed = option.status === current;
          return (
            <button
              key={option.status}
              type="button"
              aria-pressed={pressed}
              onClick={() => {
                if (!pressed) save((job) => ({ ...job, status: option.status }));
              }}
              className={cn(
                "flex min-h-16 flex-col items-start justify-center gap-1 rounded-2xl border-2 px-4 py-3 text-left",
                pressed ? statusStyle[option.status].on : statusStyle[option.status].off,
                pressed && "outline-4 outline-offset-2 outline-ink [outline-style:solid]",
              )}
            >
              <span className="flex items-center gap-2 text-[1.2em] font-bold">
                <span aria-hidden>{option.emoji}</span>
                {option.label}
              </span>
              <span>{pressed ? "✓ Chosen" : option.help}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Photos and files ---------- */

async function makeThumb(file: File): Promise<string | undefined> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, THUMB_PX / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    return canvas.toDataURL("image/jpeg", 0.72);
  } catch {
    return undefined;
  }
}

function isPdf(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

export function FilesPanel({ projectId }: { projectId: string }) {
  const all = useAllJobs();
  const files = jobOf(all, projectId).files;
  const save = useSave(projectId);
  const toast = useToasts();
  const pickRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);

  async function addFiles(list: FileList | File[]) {
    const incoming = Array.from(list);
    if (incoming.length === 0) return;
    const usable = incoming.filter((file) => file.type.startsWith("image/") || isPdf(file));
    if (usable.length < incoming.length) toast.problem("Only photos and PDF files can be added here.");
    const room = MAX_FILES - files.length;
    if (room <= 0) {
      toast.problem(`This demo holds ${MAX_FILES} files per job. Remove one first.`);
      return;
    }
    setBusy(true);
    const rows: JobFile[] = [];
    for (const file of usable.slice(0, room)) {
      const pdf = isPdf(file);
      rows.push({
        id: newId("file"),
        name: file.name || (pdf ? "File.pdf" : "Photo.jpg"),
        kind: pdf ? "pdf" : "image",
        thumb: pdf ? undefined : await makeThumb(file),
        size: file.size,
        addedAt: new Date().toISOString(),
      });
    }
    setBusy(false);
    if (rows.length) save((job) => ({ ...job, files: [...rows, ...job.files] }));
  }

  function remove(file: JobFile) {
    const index = files.findIndex((row) => row.id === file.id);
    const ok = save((job) => ({ ...job, files: job.files.filter((row) => row.id !== file.id) }));
    if (!ok) return;
    toast.undo(`Removed ${file.name}.`, () =>
      save((job) => {
        const next = [...job.files];
        next.splice(Math.min(index, next.length), 0, file);
        return { ...job, files: next };
      }),
    );
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    void addFiles(event.dataTransfer.files);
  }

  return (
    <div className="grid gap-4">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "grid gap-3 rounded-3xl border-4 border-dashed p-5 text-center",
          dragging ? "border-ink bg-sand" : "border-control bg-bone",
        )}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => pickRef.current?.click()}
            className="inline-flex min-h-16 items-center gap-3 rounded-full bg-ink px-6 text-[1.15em] font-bold text-bone"
          >
            <Plus className="size-7" aria-hidden />
            Add photo or file
          </button>
          <button
            type="button"
            onClick={() => cameraRef.current?.click()}
            className="tap inline-flex items-center gap-2 rounded-full border-2 border-ink bg-card px-5 font-semibold text-ink"
          >
            <Camera className="size-6" aria-hidden />
            Take a photo
          </button>
        </div>
        <p className="inline-flex items-center justify-center gap-2">
          <Upload className="size-5 shrink-0" aria-hidden />
          {busy ? "Adding your files…" : "Or drag photos and PDF files into this box."}
        </p>
        <input
          ref={pickRef}
          type="file"
          multiple
          accept="image/*,application/pdf"
          className="sr-only"
          tabIndex={-1}
          aria-hidden
          onChange={(event) => {
            if (event.target.files) void addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <input
          ref={cameraRef}
          type="file"
          accept="image/*,application/pdf"
          capture="environment"
          className="sr-only"
          tabIndex={-1}
          aria-hidden
          onChange={(event) => {
            if (event.target.files) void addFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </div>
      {files.length === 0 ? (
        <p>No photos or files yet. They stay on this browser only.</p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] gap-3" aria-label="Photos and files">
          {files.map((file) => (
            <li key={file.id} className="flex flex-col overflow-hidden rounded-2xl border-2 border-control bg-bone">
              {file.kind === "image" && file.thumb ? (
                // eslint-disable-next-line @next/next/no-img-element -- local data URL thumbnail
                <img src={file.thumb} alt={file.name} className="aspect-square w-full object-cover" />
              ) : (
                <div className="grid aspect-square w-full place-items-center bg-[#fde8e4] text-[#7a1f18]">
                  <FileText className="size-14" aria-hidden />
                  <span className="font-bold">{file.kind === "pdf" ? "PDF" : "Photo"}</span>
                </div>
              )}
              <p className="truncate px-3 pt-2 font-semibold" title={file.name}>
                {file.name}
              </p>
              <button
                type="button"
                onClick={() => remove(file)}
                className="tap m-2 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#7a1f18] font-semibold text-[#7a1f18]"
              >
                <Trash2 className="size-5" aria-hidden />
                Remove
                <span className="sr-only"> {file.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- Voice note / daily log ---------- */

type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};
type RecognitionCtor = new () => Recognition;

function speechCtor(): RecognitionCtor | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

const noop = () => () => {};

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function DailyLog({ projectId }: { projectId: string }) {
  const all = useAllJobs();
  const logs = jobOf(all, projectId).logs;
  const save = useSave(projectId);
  const toast = useToasts();
  const supported = useSyncExternalStore(noop, () => Boolean(speechCtor()), () => false);
  const [recording, setRecording] = useState(false);
  const [heard, setHeard] = useState("");
  const [voiceProblem, setVoiceProblem] = useState("");
  const [typed, setTyped] = useState("");
  const recRef = useRef<Recognition | null>(null);
  const heardRef = useRef("");

  function addEntry(text: string, source: LogEntry["source"]) {
    const clean = text.trim();
    if (!clean) return false;
    return save((job) => ({
      ...job,
      logs: [{ id: newId("log"), at: new Date().toISOString(), text: clean, source }, ...job.logs],
    }));
  }

  function startVoice() {
    const Ctor = speechCtor();
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    heardRef.current = "";
    setHeard("");
    setVoiceProblem("");
    rec.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i += 1) text += event.results[i][0].transcript;
      heardRef.current = text;
      setHeard(text);
    };
    rec.onerror = (event) => {
      setVoiceProblem(
        event.error === "not-allowed" || event.error === "service-not-allowed"
          ? "The microphone is blocked. Type your note in the box below instead."
          : event.error === "no-speech"
            ? "I did not hear anything. Try again, or type your note below."
            : "Voice notes are not working right now. Type your note in the box below.",
      );
    };
    rec.onend = () => {
      setRecording(false);
      recRef.current = null;
      if (addEntry(heardRef.current, "voice")) setHeard("");
    };
    recRef.current = rec;
    try {
      rec.start();
      setRecording(true);
    } catch {
      setVoiceProblem("Voice notes are not working right now. Type your note in the box below.");
    }
  }

  function onTyped(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (addEntry(typed, "typed")) setTyped("");
  }

  function remove(entry: LogEntry) {
    const index = logs.findIndex((row) => row.id === entry.id);
    if (!save((job) => ({ ...job, logs: job.logs.filter((row) => row.id !== entry.id) }))) return;
    toast.undo("Removed a log note.", () =>
      save((job) => {
        const next = [...job.logs];
        next.splice(Math.min(index, next.length), 0, entry);
        return { ...job, logs: next };
      }),
    );
  }

  return (
    <div className="grid gap-4">
      {supported ? (
        <div className="grid gap-3">
          <button
            type="button"
            aria-pressed={recording}
            onClick={() => (recording ? recRef.current?.stop() : startVoice())}
            className={cn(
              "inline-flex min-h-16 w-full items-center justify-center gap-3 rounded-full px-6 text-[1.15em] font-bold sm:w-fit",
              recording ? "bg-[#8d2e24] text-white" : "bg-ink text-bone",
            )}
          >
            {recording ? (
              <>
                <span className="relative flex size-4" aria-hidden>
                  <span className="absolute inline-flex size-full rounded-full bg-white opacity-75 animate-ping" />
                  <span className="relative inline-flex size-4 rounded-full bg-white" />
                </span>
                Recording… tap to stop
              </>
            ) : (
              <>
                <span aria-hidden className="text-2xl leading-none">🎤</span>
                Record a voice note
              </>
            )}
          </button>
          <div aria-live="polite">
            {recording ? (
              <p className="rounded-2xl border-2 border-[#7a1f18] bg-[#fde8e4] p-4 text-[#7a1f18]">
                <span className="font-bold">Listening.</span> {heard || "Start talking. Tap the red button when you are done."}
              </p>
            ) : null}
            {voiceProblem ? <p className="font-semibold text-[#7a1f18]">{voiceProblem}</p> : null}
          </div>
        </div>
      ) : (
        <p className="rounded-2xl border-2 border-control bg-bone p-4">
          Voice notes do not work in this browser. Type your note in the box below instead.
        </p>
      )}

      <form onSubmit={onTyped} className="grid gap-2">
        <label htmlFor={`log-${projectId}`} className="font-semibold">
          {supported ? "Or type a note" : "Type a note for today's log"}
        </label>
        <textarea
          id={`log-${projectId}`}
          value={typed}
          onChange={(event) => setTyped(event.target.value)}
          rows={2}
          className="min-h-12 w-full rounded-2xl border-2 border-control bg-white px-4 py-3 text-ink"
          placeholder="Example: Electrician came by. Form still not signed."
        />
        <button type="submit" className="tap inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 font-semibold text-bone">
          <Plus className="size-5" aria-hidden />
          Add to log
        </button>
      </form>

      {logs.length === 0 ? (
        <p>No log notes yet.</p>
      ) : (
        <ol className="grid gap-3" aria-label="Daily log, newest first">
          {logs.map((entry) => (
            <li key={entry.id} className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border-2 border-control bg-bone p-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  <time dateTime={entry.at}>{formatWhen(entry.at)}</time> ·{" "}
                  {entry.source === "voice" ? "🎤 Voice note" : "Typed note"}
                </p>
                <p className="mt-1">{entry.text}</p>
              </div>
              <button
                type="button"
                onClick={() => remove(entry)}
                className="tap inline-flex items-center gap-2 rounded-full border-2 border-[#7a1f18] px-4 font-semibold text-[#7a1f18]"
              >
                <Trash2 className="size-5" aria-hidden />
                Remove
                <span className="sr-only"> note from {formatWhen(entry.at)}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/* ---------- Add item to Missing ---------- */

export function AddItemForm({ projectId }: { projectId: string }) {
  const save = useSave(projectId);
  const [text, setText] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = text.trim();
    if (!title) return;
    if (save((job) => ({ ...job, items: [{ id: newId("item"), title, onHand: false, addedAt: new Date().toISOString() }, ...job.items] })))
      setText("");
  }

  return (
    <form onSubmit={onSubmit} className="mb-4 grid gap-2">
      <label htmlFor={`add-item-${projectId}`} className="font-semibold">
        + Add item
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id={`add-item-${projectId}`}
          value={text}
          onChange={(event) => setText(event.target.value)}
          enterKeyHint="done"
          className="tap min-w-0 flex-1 rounded-2xl border-2 border-control bg-white px-4 text-ink"
          placeholder="Type one thing that is missing, then press Enter"
        />
        <button type="submit" className="tap inline-flex items-center gap-2 rounded-full bg-[#8d2e24] px-5 font-semibold text-white">
          <Plus className="size-5" aria-hidden />
          Add
        </button>
      </div>
    </form>
  );
}

export function CustomItemToggle({
  projectId,
  itemId,
  title,
  onHand,
}: {
  projectId: string;
  itemId: string;
  title: string;
  onHand: boolean;
}) {
  const save = useSave(projectId);
  return (
    <button
      type="button"
      onClick={() =>
        save((job) => ({
          ...job,
          items: job.items.map((item) => (item.id === itemId ? { ...item, onHand: !item.onHand } : item)),
        }))
      }
      className="flex min-h-12 w-full flex-wrap items-center justify-between gap-3 text-left"
    >
      <span>
        <span className="block text-[1.1em] font-semibold">{title}</span>
        <span className="mt-1 block underline">
          {onHand ? "Tap to move back to Missing" : "Tap when you have it"}
        </span>
      </span>
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border-2 px-3 py-1.5 font-semibold",
          onHand ? "border-[#145c34] bg-[#e5f4ea] text-[#145c34]" : "border-[#7a1f18] bg-[#fde8e4] text-[#7a1f18]",
        )}
      >
        {onHand ? <Check className="size-5" aria-hidden /> : <span aria-hidden>●</span>}
        {onHand ? "On hand" : "Missing"}
      </span>
    </button>
  );
}
