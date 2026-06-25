"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Copy,
  Share2,
} from "lucide-react";
import FadeUp, { StaggerContainer, StaggerItem } from "@/components/shared/FadeUp";

const steps = [
  {
    step: "01",
    icon: Compass,
    title: "Discover Prompts",
    description:
      "Browse the marketplace, filter by AI tool or category, and find prompts built for your exact use case.",
  },
  {
    step: "02",
    icon: Copy,
    title: "Copy & Use",
    description:
      "Open a prompt, copy the content in one click, and paste it directly into ChatGPT, Claude, Gemini, or Midjourney.",
  },
  {
    step: "03",
    icon: Share2,
    title: "Share & Earn",
    description:
      "Publish your own prompts, grow your creator profile, and unlock premium visibility as your library performs.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16">
      <FadeUp className="mb-12 text-center">
        <h2 className="mb-4 text-[28px] font-bold text-primary md:text-[32px]">
          How It Works
        </h2>
        <p className="mx-auto max-w-2xl text-[17px] text-on-surface-variant">
          From discovery to deployment in three simple steps.
        </p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <StaggerItem key={item.step}>
              <motion.div
                whileHover={{ y: -6 }}
                className="relative h-full rounded-2xl border border-outline-variant/15 bg-white p-8 shadow-[0_4px_20px_-2px_rgba(28,82,83,0.08)]"
              >
                <span className="mb-4 block text-[12px] font-bold tracking-widest text-primary-container">
                  STEP {item.step}
                </span>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-container/10 text-primary-container">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <h3 className="mb-3 text-[20px] font-semibold text-on-surface">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-on-surface-variant">
                  {item.description}
                </p>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
