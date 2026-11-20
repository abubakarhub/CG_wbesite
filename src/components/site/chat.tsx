"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { aiBrain, type AnswerSource } from "@/content/site";
import { cn } from "@/lib/utils";

type Msg = { role: "bot" | "user"; text: string; source?: AnswerSource };

const sourceStyles: Record<AnswerSource, string> = {
  "Public record": "bg-ok/12 text-ok",
  "Reported by the owner": "bg-brass/20 text-brass-deep",
  "Open question": "bg-warn/12 text-warn",
  "Not known yet": "bg-slate-ink/10 text-slate-ink",
};

export function scriptedAnswer(question: string): { text: string; source: AnswerSource } {
  const q = ` ${question.toLowerCase()}`;
  const hit = aiBrain.answers.find((a) => a.keywords.some((k) => q.includes(k)));
  return hit ? { text: hit.answer, source: hit.source } : { text: aiBrain.unknown, source: aiBrain.unknownSource };
}

export function ChatPanel({
  className,
  onClose,
  autoFocus = false,
}: {
  className?: string;
  onClose?: () => void;
  autoFocus?: boolean;
}) {
  const [messages, setMessages] = useState<Msg[]>([{ role: "bot", text: aiBrain.greeting }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", ...scriptedAnswer(q) }]);
      setTyping(false);
    }, 750);
  };

  const asked = new Set(messages.filter((m) => m.role === "user").map((m) => m.text));
  const suggestions = aiBrain.suggestions.filter((s) => !asked.has(s)).slice(0, 4);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-30px_rgba(18,21,26,0.45)]",
        className,
      )}
      role="region"
      aria-label="CPC AI Assistant demo"
    >
      <div className="on-dark flex items-center gap-3 bg-ink px-5 py-4 text-white">
        <span className="grid size-10 place-items-center rounded-full bg-brass/20 text-brass">
          <Bot className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-lg leading-tight">CPC AI Assistant</p>
          <p className="text-xs text-white/70">{aiBrain.demoLabel}</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
            aria-label="Close assistant"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <div
        ref={listRef}
        className="flex-1 space-y-3 overflow-y-auto bg-bone/60 px-4 py-5"
        aria-live="polite"
        data-lenis-prevent
      >
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-[0.95rem] leading-relaxed",
                m.role === "user"
                  ? "rounded-br-md bg-ink text-bone"
                  : "rounded-bl-md border border-border bg-card text-ink",
              )}
            >
              <p>{m.text}</p>
              {m.source && (
                <p className="mt-2">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide uppercase",
                      sourceStyles[m.source],
                    )}
                  >
                    Source: {m.source}
                  </span>
                </p>
              )}
            </div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex gap-1.5 px-2 py-2" aria-label="Assistant is typing">
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="size-2 rounded-full bg-slate-ink/60"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
              />
            ))}
          </div>
        )}
      </div>

      {suggestions.length > 0 && (
        <div
          className="flex gap-2 overflow-x-auto border-t border-border bg-card px-4 pt-3 pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible"
          data-lenis-prevent
        >
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => ask(s)}
              className="shrink-0 rounded-full border border-border bg-bone px-3 py-1.5 text-sm whitespace-nowrap text-ink transition-colors hover:border-brass-deep hover:bg-sand"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        className="flex items-center gap-2 bg-card p-3"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Ask a question
        </label>
        <input
          id={inputId}
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about our work…"
          className="h-12 min-w-0 flex-1 rounded-full border border-input bg-bone px-4 text-base text-ink placeholder:text-slate-ink/80 focus:border-brass-deep focus:outline-none"
        />
        <button
          type="submit"
          className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-bone transition-colors hover:bg-ink-2 disabled:opacity-50"
          aria-label="Send question"
          disabled={!input.trim() || typing}
        >
          <Send className="size-5" />
        </button>
      </form>
    </div>
  );
}

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const launcherRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      launcherRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (pathname === "/ai") return null;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-24 z-[60] origin-bottom-right sm:inset-x-auto sm:right-6 sm:w-[400px]"
          >
            <ChatPanel className="h-[min(600px,calc(100dvh-9rem))]" onClose={close} autoFocus />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="group fixed right-4 bottom-4 z-[60] flex items-center gap-2.5 rounded-full bg-ink py-3 pr-5 pl-3 text-bone shadow-[0_20px_50px_-15px_rgba(18,21,26,0.6)] sm:right-6 sm:bottom-6"
        aria-expanded={open}
        data-chat-launcher
        aria-label={open ? "Close CPC AI Assistant" : "Open CPC AI Assistant (demo)"}
      >
        <span className="relative grid size-10 place-items-center rounded-full bg-brass text-ink">
          {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
          {!open && <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-ink bg-ok" />}
        </span>
        <span className="text-left leading-tight">
          <span className="flex items-center gap-1 text-sm font-semibold">
            Ask CPC AI <Sparkles className="size-3.5 text-brass" />
          </span>
          <span className="block text-[0.7rem] text-bone/70">AI demo</span>
        </span>
      </motion.button>
    </>
  );
}
