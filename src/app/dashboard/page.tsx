import type { Metadata } from "next";
import { TodayView } from "@/components/dashboard/today-view";

export const metadata: Metadata = { title: "Project dashboard" };

export default function DashboardPage() {
  return <TodayView />;
}
