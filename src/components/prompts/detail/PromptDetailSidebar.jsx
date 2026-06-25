"use client";

import Link from "next/link";
import { BookmarkPlus, Bot, Copy, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatCopyCount } from "@/lib/promptConstants";

export default function PromptDetailSidebar({
  prompt,
  tokenEstimate,
  contentLocked,
  onCopy,
  onBookmark,
  copyPending,
  similarPrompts,
  formatDate,
}) {
  return (
    <div className="flex flex-col gap-8 lg:sticky lg:top-24">
      <section className="rounded-2xl border border-outline-variant/20 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(28,82,83,0.08)]">
        <h3 className="mb-4 text-[24px] font-semibold text-primary">Prompt Stats</h3>

        <div className="mb-6 space-y-4">
          {[
            { label: "Category", value: prompt.category },
            { label: "Tool", value: prompt.aiTool },
            { label: "Difficulty", value: prompt.difficulty },
            { label: "Tokens (Approx)", value: `~${tokenEstimate}` },
            { label: "Copies", value: formatCopyCount(prompt.copyCount) },
            {
              label: "Last Updated",
              value: formatDate(prompt.updatedAt || prompt.createdAt),
            },
          ].map((row, index, rows) => (
            <div
              key={row.label}
              className={`flex items-center justify-between pb-2 ${
                index < rows.length - 1 ? "border-b border-outline-variant/20" : ""
              }`}
            >
              <span className="text-[16px] text-on-surface-variant">{row.label}</span>
              <span className="text-[14px] font-medium text-on-surface">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button
            className="w-full"
            onClick={onCopy}
            disabled={contentLocked || copyPending}
          >
            <Copy className="h-4 w-4" strokeWidth={1.75} />
            {copyPending ? "Copying..." : "Copy to Clipboard"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={onBookmark}
          >
            <BookmarkPlus className="h-4 w-4" strokeWidth={1.75} />
            Save to Collection
          </Button>
        </div>
      </section>

      {similarPrompts.length > 0 && (
        <section className="rounded-2xl border border-outline-variant/20 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(28,82,83,0.08)]">
          <h3 className="mb-4 text-[24px] font-semibold text-primary">
            Similar Prompts
          </h3>
          <div className="flex flex-col gap-4">
            {similarPrompts.map((item) => (
              <Link
                key={item._id}
                href={`/prompts/${item._id}`}
                className="block rounded-xl border border-outline-variant/10 bg-surface-container-low p-4 transition-colors hover:bg-surface-container"
              >
                <div className="mb-1 text-[14px] font-bold text-on-surface">
                  {item.title}
                </div>
                <div className="flex items-center justify-between text-[12px] text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <Bot className="h-3.5 w-3.5" strokeWidth={1.75} />
                    {item.aiTool}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star
                      className="h-3.5 w-3.5 fill-tertiary-container text-tertiary-container"
                      strokeWidth={1.5}
                    />
                    {(item.averageRating || 0).toFixed(1)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
