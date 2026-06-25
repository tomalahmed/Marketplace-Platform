"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import FadeUp, { StaggerContainer, StaggerItem } from "@/components/shared/FadeUp";

const REVIEWS = [
  {
    name: "Maya Rodriguez",
    email: "maya.r@studio.io",
    rating: 5,
    date: "Mar 12, 2026",
    comment:
      "PromptGrowth cut my content workflow in half. The SEO prompts are incredibly detailed and save hours of trial and error.",
  },
  {
    name: "James Okonkwo",
    email: "james@devstack.dev",
    rating: 5,
    date: "Feb 28, 2026",
    comment:
      "As a developer, the coding prompts are production-grade. I bookmark prompts daily and reuse them across client projects.",
  },
  {
    name: "Priya Sharma",
    email: "priya@brandlab.co",
    rating: 4,
    date: "Feb 15, 2026",
    comment:
      "The marketplace quality is outstanding. Premium prompts are worth every penny for our marketing campaigns.",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? "fill-amber-400 text-amber-400"
              : "text-outline-variant/40"
          }`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function CustomerReviewsSection() {
  return (
    <section id="customer-reviews" className="py-16">
      <FadeUp className="mb-12 text-center">
        <h2 className="mb-4 text-[28px] font-bold text-primary md:text-[32px]">
          What Creators Say
        </h2>
        <p className="mx-auto max-w-2xl text-[17px] text-on-surface-variant">
          Real feedback from users who rely on PromptGrowth every day.
        </p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <StaggerItem key={review.email}>
            <motion.article
              whileHover={{ y: -6 }}
              className="relative flex h-full flex-col rounded-2xl border border-outline-variant/15 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(28,82,83,0.08)]"
            >
              <Quote
                className="mb-4 h-8 w-8 text-primary-container/40"
                strokeWidth={1.5}
              />
              <p className="mb-6 flex-grow text-[15px] leading-relaxed text-on-surface-variant">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="border-t border-outline-variant/15 pt-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <StarRating rating={review.rating} />
                  <span className="text-[12px] text-on-surface-variant/70">
                    {review.date}
                  </span>
                </div>
                <h4 className="text-[15px] font-semibold text-on-surface">
                  {review.name}
                </h4>
                <p className="text-[13px] text-on-surface-variant">
                  {review.email}
                </p>
              </div>
            </motion.article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
