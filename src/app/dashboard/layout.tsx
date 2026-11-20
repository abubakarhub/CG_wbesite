import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard/shell";
import { DashboardProvider } from "@/components/dashboard/state";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardProvider>
  );
}
