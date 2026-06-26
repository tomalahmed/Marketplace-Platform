"use client";

import { useRouter } from "next/navigation";
import { Bookmark, Copy, Crown, Lock } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { formatCopyCount } from "@/lib/promptConstants";
import {
  getPromptPreviewText,
  isProPrompt,
  isPromptContentLocked,
} from "@/lib/promptUtils";
import { cn } from "@/lib/cn";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";
}

export default function PromptCard({ prompt, className }) {
  const router = useRouter();
  const { user } = useAuth();

  const creatorName =
    typeof prompt.creator === "object" ? prompt.creator?.name : "Unknown";
  const creatorPhoto =
    typeof prompt.creator === "object" ? prompt.creator?.photoURL : "";

  const isPro = isProPrompt(prompt);
  const contentLocked = isPromptContentLocked(prompt, user);
  const previewText = getPromptPreviewText(prompt, user);

  const handleViewDetails = () => {
    const destination = `/prompts/${prompt._id}`;

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(destination)}`);
      return;
    }

    router.push(destination);
  };

  const actionLabel = !user
    ? "Sign in to view"
    : contentLocked
      ? "View & unlock"
      : "View Details";

  return (
    <article
      className={cn(
        "group flex h-full cursor-pointer flex-col rounded-[1.5rem] border border-outline-variant/20 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(28,82,83,0.08)] transition-all duration-300 hover:border-primary hover:shadow-lg",
        isPro && "border-primary-container/25",
        className
      )}
      onClick={handleViewDetails}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleViewDetails();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {isPro && (
            <span className="inline-flex items-center gap-1 rounded-md bg-primary-container/15 px-2 py-1 text-[12px] font-semibold text-primary-container">
              <Crown className="h-3 w-3" strokeWidth={2} />
              Pro
            </span>
          )}
          <span className="rounded-md bg-surface-container-highest px-2 py-1 text-[12px] font-semibold text-on-surface">
            {prompt.category}
          </span>
          <span className="rounded-md bg-surface-container-highest px-2 py-1 text-[12px] font-semibold text-on-surface">
            {prompt.aiTool}
          </span>
        </div>
        <Bookmark
          className="h-5 w-5 shrink-0 text-outline-variant transition-colors group-hover:text-primary"
          strokeWidth={1.75}
          onClick={(e) => e.stopPropagation()}
          aria-hidden
        />
      </div>

      <h3 className="mb-2 line-clamp-2 text-[20px] font-semibold leading-snug text-on-surface">
        {prompt.title}
      </h3>

      {previewText && (
        <div className="relative mb-4 overflow-hidden rounded-lg bg-primary/5 p-3 font-mono text-sm leading-relaxed text-on-surface-variant">
          <p className={cn("line-clamp-3", contentLocked && "select-none blur-[5px]")}>
            {previewText}
          </p>
          {contentLocked && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/35">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-primary shadow-sm">
                <Lock className="h-3.5 w-3.5" strokeWidth={2} />
                Pro — Premium required
              </span>
            </div>
          )}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {creatorPhoto ? (
            <img
              src={creatorPhoto}
              alt={creatorName}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-variant text-sm font-bold text-primary">
              {getInitials(creatorName)}
            </div>
          )}
          <span className="text-[14px] font-medium text-on-surface">
            {creatorName}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[12px] font-semibold text-on-surface-variant">
          <Copy className="h-4 w-4" strokeWidth={1.75} />
          {formatCopyCount(prompt.copyCount)}
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleViewDetails();
        }}
        className="mt-4 w-full rounded-lg bg-surface-variant py-2 text-[14px] font-medium text-on-surface-variant transition-colors group-hover:bg-primary group-hover:text-on-primary"
      >
        {actionLabel}
      </button>
    </article>
  );
}
