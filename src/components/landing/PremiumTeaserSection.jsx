"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Crown, Lock, Sparkles, TrendingUp } from "lucide-react";
import FadeUp, { StaggerContainer, StaggerItem } from "@/components/shared/FadeUp";

const perks = [
  {
    icon: Lock,
    title: "Unlock Private Prompts",
    description:
      "Access premium-only prompts with advanced frameworks not available on the free tier.",
  },
  {
    icon: Sparkles,
    title: "Early Featured Access",
    description:
      "Get first access to newly featured prompts and trending creator releases.",
  },
  {
    icon: TrendingUp,
    title: "Creator Analytics",
    description:
      "Track performance metrics, copy trends, and audience engagement on your library.",
  },
];

export default function PremiumTeaserSection() {
  return (
    <section id="premium" className="py-16">
      <div className="overflow-hidden rounded-3xl border border-outline-variant/15 bg-gradient-to-br from-surface-container-low via-white to-tertiary-fixed/20 p-8 md:p-12">
        <FadeUp className="mb-10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-container/20 bg-primary-container/10 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-primary-container">
            <Crown className="h-3.5 w-3.5" strokeWidth={2} />
            Premium
          </span>
          <h2 className="mb-4 text-[28px] font-bold text-primary md:text-[32px]">
            Go further with Premium
          </h2>
          <p className="mx-auto max-w-2xl text-[17px] text-on-surface-variant">
            Subscribe to unlock private prompts, advanced creator tools, and
            priority marketplace visibility.
          </p>
        </FadeUp>

        <StaggerContainer className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <StaggerItem key={perk.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full rounded-2xl border border-outline-variant/10 bg-white/80 p-6 backdrop-blur-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 text-[18px] font-semibold text-on-surface">
                    {perk.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-on-surface-variant">
                    {perk.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeUp className="text-center">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-container px-8 py-3.5 text-[14px] font-semibold text-on-primary transition-colors hover:bg-primary"
            >
              <Crown className="h-4 w-4" strokeWidth={2} />
              View Premium Plans
            </Link>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}
