"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeUp, { StaggerContainer, StaggerItem } from "@/components/shared/FadeUp";
import Spinner from "@/components/ui/Spinner";
import FeaturedPromptCard from "@/components/landing/FeaturedPromptCard";
import { useFeaturedPrompts } from "@/hooks/usePrompts";
import { dedupePromptsById } from "@/lib/promptUtils";

export default function FeaturedPromptsSection() {
  const { data, isLoading, isError } = useFeaturedPrompts();
  const prompts = dedupePromptsById((data?.data || []).slice(0, 6));

  return (
    <section className="py-16">
      <FadeUp className="mb-10 flex items-end justify-between gap-4">
        <div>
          <h2 className="mb-2 text-[28px] font-bold text-primary md:text-[32px]">
            Featured Prompts
          </h2>
          <p className="text-[16px] text-on-surface-variant">
            Hand-picked top performers for your workflow.
          </p>
        </div>
        <Link
          href="/prompts"
          className="flex shrink-0 items-center gap-1 text-[14px] font-medium text-primary-container transition-colors hover:underline"
        >
          View All
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </FadeUp>

      {isLoading && (
        <div className="flex min-h-[280px] items-center justify-center">
          <Spinner label="Loading featured prompts..." />
        </div>
      )}

      {isError && (
        <FadeUp>
          <div className="rounded-2xl border border-outline-variant/20 bg-white p-10 text-center">
            <p className="text-on-surface-variant">
              Unable to load featured prompts right now.
            </p>
          </div>
        </FadeUp>
      )}

      {!isLoading && !isError && prompts.length > 0 && (
        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <StaggerItem key={prompt._id}>
              <FeaturedPromptCard prompt={prompt} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {!isLoading && !isError && prompts.length === 0 && (
        <FadeUp>
          <div className="rounded-2xl border border-outline-variant/20 bg-white p-10 text-center">
            <p className="text-on-surface-variant">
              Featured prompts will appear here once approved by admins.
            </p>
          </div>
        </FadeUp>
      )}
    </section>
  );
}
