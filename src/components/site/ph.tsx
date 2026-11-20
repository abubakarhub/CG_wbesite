import { cn } from "@/lib/utils";

/**
 * Renders copy from the content file. Any [bracketed] segment is shown as a
 * dashed "placeholder" chip so missing info is impossible to miss.
 */
export function Ph({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span
            key={i}
            className={cn("placeholder-chip", className)}
            title="Placeholder: waiting on real info"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function isPlaceholder(text: string) {
  return /^\[[^\]]+\]$/.test(text.trim());
}
