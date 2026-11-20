import { Building2, ClipboardList, Hammer, Home } from "lucide-react";

const icons = { home: Home, building: Building2, hammer: Hammer, clipboard: ClipboardList };

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name as keyof typeof icons] ?? Home;
  return <Icon className={className} aria-hidden />;
}
