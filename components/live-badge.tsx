import { cn } from "@/lib/utils";
import { FC } from "react";

interface LiveBadgeProps {
  className?: string
}

const LiveBadge: FC<LiveBadgeProps> = (props) => {
  const { className } = props;

  return (
    <div
      className={cn(
        "bg-rose-500 text-center p-0.5 px-1.5 rounded uppercase border-background font-semibold tracking-wide",
        className,
      )}
    >
      Live
    </div>
  )
}

export { LiveBadge }