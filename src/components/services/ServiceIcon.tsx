import {
  Camera,
  Clapperboard,
  MapPin,
  MessagesSquare,
  MonitorSmartphone,
  PenTool,
  Sun,
  TrendingUp,
} from "lucide-react";
import type { IconName } from "@/data/services";

const icons: Record<IconName, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  MessagesSquare,
  TrendingUp,
  PenTool,
  MonitorSmartphone,
  MapPin,
  Clapperboard,
  Camera,
  Sun,
};

export function ServiceIcon({
  name,
  className,
  strokeWidth = 1.8,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
