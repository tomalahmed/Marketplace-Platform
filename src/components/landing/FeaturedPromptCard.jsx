"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bot,
  Brush,
  Code2,
  Copy,
  Crown,
  Lock,
  MessageSquare,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { formatCopyCount } from "@/lib/promptConstants";
import {
  getPromptPreviewText,
  isProPrompt,
  isPromptContentLocked,
} from "@/lib/promptUtils";
import { cn } from "@/lib/cn";

const toolIcons = {
  ChatGPT: MessageSquare,
  Claude: Bot,
  Gemini: Sparkles,
  Midjourney: Palette,
  "GitHub Copilot": Code2,
  "DALL-E": Brush,
  "Stable Diffusion": Zap,
};

function getToolIcon(aiTool) {
  return toolIcons[aiTool] || Bot;
}

export default function FeaturedPromptCard({ prompt, className }) {
  const router = useRouter();
  const { user } = useAuth();
  const ToolIcon = getToolIcon(prompt.aiTool);
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

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className={cn(
        "card-shadow card-hover flex h-full flex-col rounded-xl border border-outline-variant/10 bg-white p-6 transition-all",
        isPro && "border-primary-container/25",
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {isPro && (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary-container/30 bg-primary-container/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary-container">
              <Crown className="h-3 w-3" strokeWidth={2} />
              Pro
            </span>
          )}
          <span className="rounded-full border border-tertiary-fixed-dim/50 bg-tertiary-fixed px-3 py-1 text-[12px] font-semibold text-on-tertiary-fixed">
            {prompt.category}
          </span>
        </div>
        <span className="text-primary-container" title={prompt.aiTool}>
          <ToolIcon className="h-6 w-6" strokeWidth={1.75} />
        </span>
      </div>

      <h3 className="mb-3 flex-grow text-[20px] font-semibold leading-snug text-on-surface">
        {prompt.title}
      </h3>

      {previewText && (
        <div className="relative mb-6 overflow-hidden rounded-lg bg-surface-container-high/30 p-4 font-mono text-sm leading-relaxed text-on-surface-variant">
          <p className={cn("line-clamp-3", contentLocked && "select-none blur-[5px]")}>
            {previewText}
          </p>
          {contentLocked && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/35">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-primary shadow-sm">
                <Lock className="h-3 w-3" strokeWidth={2} />
                Pro — Premium required
              </span>
            </div>
          )}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-outline-variant/20 pt-4">
        <div className="flex min-w-0 items-center gap-3">
          {prompt.creator && (
            <div className="flex min-w-0 items-center gap-2">
              {prompt.creator.photoURL ? (
                <img
                  src={prompt.creator.photoURL}
                  alt={prompt.creator.name}
                  className="h-7 w-7 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-container/15 text-[11px] font-bold text-primary-container">
                  {prompt.creator.name?.charAt(0) || "?"}
                </span>
              )}
              <span className="truncate text-[12px] font-medium text-on-surface-variant">
                {prompt.creator.name}
              </span>
            </div>
          )}
          <div className="flex shrink-0 items-center gap-1.5 text-[12px] font-semibold text-on-surface-variant">
            <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
            {formatCopyCount(prompt.copyCount)}
          </div>
        </div>
        <button
          type="button"
          onClick={handleViewDetails}
          className="text-[14px] font-medium text-primary-container transition-colors hover:text-primary hover:underline"
        >
          {!user ? "Sign in" : contentLocked ? "Unlock" : "View Details"}
        </button>
      </div>
    </motion.article>
  );
}
