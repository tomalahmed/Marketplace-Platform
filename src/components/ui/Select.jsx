import { cn } from "@/lib/cn";

export default function Select({
  className,
  label,
  htmlFor,
  options = [],
  placeholder = "Select an option",
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
      <select
        id={htmlFor}
        className={cn(
          "w-full appearance-none rounded-xl border border-outline-variant/25 bg-white py-3 pl-4 pr-10 text-[15px] text-on-surface outline-none transition-all focus:border-primary-container focus:ring-2 focus:ring-primary-container/15",
          !props.value && "text-outline-variant"
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
