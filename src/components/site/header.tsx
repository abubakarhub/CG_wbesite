"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, demoBanner, demoNav, nav } from "@/content/site";
import { cn } from "@/lib/utils";
import { Ph } from "./ph";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={cn(
          "grid size-10 place-items-center rounded-lg border font-serif text-sm font-semibold tracking-wide transition-colors",
          light ? "border-white/40 text-white" : "border-ink/30 text-ink",
        )}
        aria-hidden
        title={company.logo}
      >
        GC
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-lg font-medium", light ? "text-white" : "text-ink")}>
          General
        </span>
        <span
          className={cn(
            "mt-1 text-[0.62rem] font-semibold tracking-[0.28em] uppercase",
            light ? "text-white/70" : "text-slate-ink",
          )}
        >
          Contractor Co.
        </span>
      </span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const light = !scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="on-dark bg-ink px-4 py-1.5 text-center text-xs text-white/80 sm:text-sm">
        <Ph text={demoBanner} />
      </div>
      <div
        className={cn(
          "transition-all duration-500",
          scrolled || open
            ? "border-b border-border/70 bg-bone/90 shadow-[0_8px_30px_-20px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <nav
          className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 md:px-8"
          aria-label="Main"
        >
          <Link href="/" aria-label="General Contractor Co. home" className="shrink-0">
            <Logo light={light} />
          </Link>

          <ul className="hidden items-center gap-0.5 min-[1440px]:flex">
            {[...nav, ...demoNav].map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-12 items-center rounded-full px-3 text-[0.9rem] font-medium whitespace-nowrap transition-colors",
                      light ? "text-white/85 hover:text-white" : "text-ink/75 hover:text-ink",
                      active && (light ? "text-white" : "text-ink"),
                    )}
                  >
                    {item.short ?? item.label}
                    {item.newTab ? (
                      <>
                        <ArrowUpRight className="ml-0.5 size-4" aria-hidden />
                        <span className="sr-only">{` — ${item.label} (opens in a new tab)`}</span>
                      </>
                    ) : null}
                    {item.note && (
                      <span
                        className={cn(
                          "ml-1.5 rounded-full px-1.5 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase",
                          light ? "bg-white/15 text-white" : "bg-brass/20 text-brass-deep",
                        )}
                      >
                        {item.note}
                      </span>
                    )}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full",
                          light ? "bg-brass" : "bg-brass-deep",
                        )}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={cn(
                "group hidden items-center gap-2 rounded-full px-5 py-2.5 text-[0.92rem] font-semibold whitespace-nowrap transition-all sm:inline-flex",
                light ? "bg-white text-ink hover:bg-brass" : "bg-ink text-bone hover:bg-ink-2",
              )}
            >
              Start your project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "grid size-11 place-items-center rounded-full border min-[1440px]:hidden",
                light ? "border-white/40 text-white" : "border-ink/20 text-ink",
              )}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="h-[calc(100dvh-6rem)] overflow-y-auto bg-bone px-6 pt-4 pb-10 min-[1440px]:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex items-center justify-between border-b border-border py-4 font-serif text-3xl text-ink"
                  >
                    {item.label}
                    <ArrowRight className="size-5 text-brass-deep" />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="mt-8 mb-2 text-xs font-semibold tracking-[0.2em] text-slate-ink uppercase">
              Demo tools
            </p>
            <ul className="grid gap-2">
              {demoNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    className="flex min-h-12 items-center justify-between rounded-xl bg-sand px-4 py-3.5 text-lg font-medium text-ink"
                  >
                    <span>
                      {item.label}
                      {item.newTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
                    </span>
                    <span className="rounded-full bg-brass/25 px-2 py-0.5 text-xs font-semibold text-brass-deep uppercase">
                      {item.note}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-lg font-semibold text-bone"
            >
              Start your project <ArrowRight className="size-5" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
