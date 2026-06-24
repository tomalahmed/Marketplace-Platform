import { cn } from "@/lib/cn";

const variants = {
  default: "bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary-fixed-dim/50",
  primary: "bg-primary-container/15 text-primary border border-primary-container/20",
  muted: "bg-surface-container-high/50 text-on-surface-variant border border-outline-variant/20",
};

export default function Badge({ children, className, variant = "default" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold leading-[1.2]",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
