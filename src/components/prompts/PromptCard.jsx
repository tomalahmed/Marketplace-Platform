"use client";

import { useRouter } from "next/navigation";
import {
  Bot,
  Brush,
  Code2,
  Copy,
  MessageSquare,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import useAuth from "@/hooks/useAuth";
import { formatCopyCount } from "@/lib/promptConstants";
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

export default function PromptCard({ prompt, className }) {
  const router = useRouter();
  const { user } = useAuth();
  const ToolIcon = getToolIcon(prompt.aiTool);
  const creatorName =
    typeof prompt.creator === "object" ? prompt.creator?.name : "Unknown";

  const handleViewDetails = () => {
    const destination = `/prompts/${prompt._id}`;

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(destination)}`);
      return;
    }

    router.push(destination);
  };

  return (
    <article
      className={cn(
        "card-shadow card-hover flex h-full flex-col rounded-xl border border-outline-variant/10 bg-white p-6 transition-all",
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <Badge>{prompt.category}</Badge>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-container/10 text-primary-container"
          title={prompt.aiTool}
        >
          <ToolIcon className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </div>

      <h3 className="mb-3 flex-grow text-[20px] font-semibold leading-snug text-on-surface">
        {prompt.title}
      </h3>

      {prompt.description && (
        <p className="mb-4 line-clamp-2 text-[14px] leading-relaxed text-on-surface-variant">
          {prompt.description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-outline-variant/20 pt-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-on-surface-variant">
            <Copy className="h-4 w-4" strokeWidth={1.75} />
            {formatCopyCount(prompt.copyCount)} copies
          </div>
          <p className="text-[12px] text-on-surface-variant/80">by {creatorName}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewDetails}
          className="font-semibold text-primary-container hover:text-primary"
        >
          View Details
        </Button>
      </div>
    </article>
  );
}
