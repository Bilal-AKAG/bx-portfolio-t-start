import { cn } from "@/lib/utils";

interface SeparatorProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export default function Separator({
  className,
  orientation = "horizontal",
}: SeparatorProps) {
  return (
    <div
      className={cn(
        "relative flex bg-background",
        // match page background
        orientation === "horizontal"
          ? "h-8 w-full border-border-primary border-b border-dashed"
          : "h-full w-8 border-border-primary border-dashed",
        "[&::after]:pointer-events-none [&::before]:pointer-events-none",
        "overflow-hidden",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(315deg, rgba(82,82,91,0.3) 0px, rgba(82,82,91,0.3) 1px, transparent 1px, transparent 10px)",
          zIndex: 0,
        }}
      />
    </div>
  );
}
