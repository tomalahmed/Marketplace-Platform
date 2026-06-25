"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  GraduationCap,
  Lightbulb,
  Megaphone,
  Palette,
  PenLine,
  Search,
  Zap,
} from "lucide-react";
import FadeUp, { StaggerContainer, StaggerItem } from "@/components/shared/FadeUp";
import { PROMPT_CATEGORIES } from "@/lib/promptConstants";

const categoryIcons = {
  Copywriting: PenLine,
  Design: Palette,
  Coding: Code2,
  Marketing: Megaphone,
  Creative: Lightbulb,
  Productivity: Zap,
  SEO: Search,
  Education: GraduationCap,
};

export default function BrowseCategoriesSection() {
  return (
    <section id="categories" className="py-16">
      <FadeUp className="mb-12 text-center">
        <h2 className="mb-4 text-[28px] font-bold text-primary md:text-[32px]">
          Browse by Category
        </h2>
        <p className="mx-auto max-w-2xl text-[17px] text-on-surface-variant">
          Jump straight into the prompts that match your workflow.
        </p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {PROMPT_CATEGORIES.map((category) => {
          const Icon = categoryIcons[category] || Lightbulb;
          const href = `/prompts?category=${encodeURIComponent(category)}`;

          return (
            <StaggerItem key={category}>
              <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={href}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-outline-variant/15 bg-white p-5 text-center shadow-sm transition-colors hover:border-primary-container/30 hover:bg-surface-container-lowest"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary-fixed text-on-tertiary-fixed">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <span className="text-[14px] font-semibold text-on-surface">
                    {category}
                  </span>
                </Link>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <FadeUp delay={0.2} className="mt-8 text-center">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/prompts"
            className="text-[14px] font-semibold text-primary-container transition-colors hover:text-primary hover:underline"
          >
            View all categories in the marketplace →
          </Link>
        </motion.div>
      </FadeUp>
    </section>
  );
}
