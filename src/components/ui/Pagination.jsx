import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set([1, total, current, current - 1, current + 1]);
  return [...pages]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);
}

export default function Pagination({
  page = 1,
  totalPages = 1,
  onPageChange,
  className,
}) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);

  return (
    <nav
      className={cn("flex items-center justify-center gap-2", className)}
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        Prev
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((pageNumber, index) => {
          const prev = pages[index - 1];
          const showEllipsis = prev && pageNumber - prev > 1;

          return (
            <span key={pageNumber} className="flex items-center gap-1">
              {showEllipsis && (
                <span className="px-1 text-on-surface-variant">…</span>
              )}
              <button
                type="button"
                onClick={() => onPageChange(pageNumber)}
                className={cn(
                  "flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-[14px] font-semibold transition-colors",
                  pageNumber === page
                    ? "bg-primary-container text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                )}
                aria-current={pageNumber === page ? "page" : undefined}
              >
                {pageNumber}
              </button>
            </span>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        Next
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </Button>
    </nav>
  );
}
