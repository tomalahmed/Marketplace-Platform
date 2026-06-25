"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Crown } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";

export default function CtaSection() {
  return (
    <FadeUp className="pb-8 pt-4">
      <section className="relative overflow-hidden rounded-3xl bg-primary-container px-8 py-14 text-center md:px-16">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="relative">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-on-primary">
            <Crown className="h-4 w-4" strokeWidth={2} />
            Join the community
          </span>
          <h2 className="mb-4 text-[28px] font-bold text-on-primary md:text-[36px]">
            Ready to level up your AI workflow?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-[16px] leading-relaxed text-on-primary/85">
            Create your free account, explore thousands of prompts, and publish
            your own to grow as a creator.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-[14px] font-semibold text-primary-container transition-colors hover:bg-surface-container-lowest"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-8 py-3.5 text-[14px] font-semibold text-on-primary transition-colors hover:bg-white/10"
              >
                View Premium
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}
