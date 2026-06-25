"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import FadeUp, { StaggerContainer, StaggerItem } from "@/components/shared/FadeUp";

const TOP_CREATORS = [
  { name: "Alex Chen", prompts: 142, color: "bg-emerald-600" },
  { name: "Sarah Jenkins", prompts: 98, color: "bg-teal-600" },
  { name: "David Kim", prompts: 215, color: "bg-cyan-700" },
  { name: "Elena Rossi", prompts: 87, color: "bg-primary-container" },
  { name: "Marcus Doe", prompts: 112, color: "bg-secondary" },
  { name: "Lisa Wang", prompts: 64, color: "bg-emerald-700" },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TopCreatorsSection() {
  return (
    <section id="top-creators" className="py-16">
      <FadeUp className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-800">
            <Award className="h-3.5 w-3.5" strokeWidth={2} />
            Leaderboard
          </span>
          <h2 className="mb-2 text-[28px] font-bold text-primary md:text-[32px]">
            Top Creators
          </h2>
          <p className="text-[16px] text-on-surface-variant">
            The minds behind the marketplace&apos;s best performing assets.
          </p>
        </div>
        <p className="text-[12px] font-medium text-on-surface-variant/70">
          Live rankings coming in Phase 5
        </p>
      </FadeUp>

      <StaggerContainer
        className="hide-scrollbar flex snap-x gap-6 overflow-x-auto pb-4"
        stagger={0.08}
      >
        {TOP_CREATORS.map((creator, index) => (
          <StaggerItem
            key={creator.name}
            className="flex min-w-[140px] snap-center flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.06, y: -4 }}
              className="relative flex flex-col items-center"
            >
              {index === 0 && (
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-white shadow-sm"
                >
                  <Award className="h-3.5 w-3.5" strokeWidth={2} />
                </motion.span>
              )}
              <div
                className={`mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-surface-container-highest text-[22px] font-bold text-white shadow-md ${creator.color}`}
              >
                {getInitials(creator.name)}
              </div>
              <h4 className="text-center text-[14px] font-bold text-on-surface">
                {creator.name}
              </h4>
              <p className="text-[12px] font-semibold text-primary-container">
                {creator.prompts} Prompts
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
