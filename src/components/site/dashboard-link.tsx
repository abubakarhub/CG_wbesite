import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function OpenDashboardLink({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/dashboard"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-lg font-semibold",
        variant === "light" ? "bg-white text-ink hover:bg-brass" : "bg-ink text-bone hover:bg-ink-2",
        className,
      )}
    >
      Open Project Dashboard
      <ArrowUpRight className="size-5" aria-hidden />
      <span className="sr-only"> (opens in a new tab)</span>
    </Link>
  );
}
