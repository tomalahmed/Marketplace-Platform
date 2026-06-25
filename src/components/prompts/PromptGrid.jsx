import PromptCard from "@/components/prompts/PromptCard";
import Spinner from "@/components/ui/Spinner";
import { cn } from "@/lib/cn";
import { dedupePromptsById } from "@/lib/promptUtils";

export default function PromptGrid({
  prompts = [],
  isLoading = false,
  isError = false,
  errorMessage = "Failed to load prompts.",
  emptyMessage = "No prompts found. Try adjusting your filters.",
  className,
}) {
  if (isLoading) {
    return (
      <div className={cn("flex min-h-[320px] items-center justify-center", className)}>
        <Spinner label="Loading prompts..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-error/20 bg-error-container/30 p-10 text-center",
          className
        )}
      >
        <p className="text-[15px] font-medium text-on-surface">{errorMessage}</p>
      </div>
    );
  }

  const uniquePrompts = dedupePromptsById(prompts);

  if (!uniquePrompts.length) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-outline-variant/20 bg-white p-12 text-center shadow-sm",
          className
        )}
      >
        <p className="text-[15px] text-on-surface-variant">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {uniquePrompts.map((prompt) => (
        <PromptCard key={prompt._id} prompt={prompt} />
      ))}
    </div>
  );
}
