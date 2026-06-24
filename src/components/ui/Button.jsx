import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-primary-container text-on-primary hover:bg-primary shadow-sm",
  secondary:
    "border border-secondary bg-transparent text-secondary hover:bg-secondary/5",
  outline:
    "border border-outline-variant/40 bg-white text-on-surface hover:bg-surface-container-low/60",
  ghost:
    "bg-transparent text-on-surface-variant hover:text-primary hover:bg-primary-container/10",
};

const sizes = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-3 text-[14px]",
  lg: "px-8 py-3.5 text-[15px]",
};

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  type = "button",
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
