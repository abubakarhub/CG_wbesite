"use client";

import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, type ReactNode } from "react";

function LenisController() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const onDashboard = pathname.startsWith("/dashboard");

  useEffect(() => {
    if (onDashboard) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [onDashboard]);

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="never">
      <Suspense fallback={null}>
        <LenisController />
      </Suspense>
      {children}
    </MotionConfig>
  );
}
