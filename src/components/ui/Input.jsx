import { cn } from "@/lib/cn";

export default function Input({
  className,
  inputClassName,
  label,
  htmlFor,
  icon: Icon,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="mb-2 block text-[14px] font-medium text-on-surface-variant"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-outline-variant"
            strokeWidth={1.75}
          />
        )}
        <input
          id={htmlFor}
          className={cn(
            "w-full rounded-xl border border-outline-variant/25 bg-white py-3 text-[15px] text-on-surface outline-none transition-all placeholder:text-outline-variant/80 focus:border-primary-container focus:ring-2 focus:ring-primary-container/15",
            Icon ? "pl-11 pr-4" : "px-4",
            inputClassName
          )}
          {...props}
        />
      </div>
    </div>
  );
}
