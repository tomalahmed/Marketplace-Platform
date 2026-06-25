"use client";

import { motion } from "framer-motion";
import { Globe, ShieldCheck, TrendingUp, Users } from "lucide-react";
import FadeUp, { StaggerContainer, StaggerItem } from "@/components/shared/FadeUp";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Curated Quality",
    description:
      "Every prompt is tested and verified by our expert team to ensure maximum performance and reliable outputs.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Learn from top engineers, share your variations, and build a reputation in the fastest growing AI community.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description:
      "Seamlessly integrate prompts into your workflow from anywhere, supporting all major foundational AI models.",
  },
  {
    icon: TrendingUp,
    title: "Performance Insights",
    description:
      "Track copies, ratings, and engagement so you always know which prompts deliver the best real-world results.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="my-12 rounded-3xl bg-surface-container-low px-6 py-16 md:px-16"
    >
      <FadeUp className="mb-12 text-center">
        <h2 className="mb-4 text-[28px] font-bold text-primary md:text-[32px]">
          Why PromptGrowth?
        </h2>
        <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-on-surface-variant md:text-[18px]">
          We provide the fertile ground for your AI initiatives to thrive.
        </p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <StaggerItem key={benefit.title}>
              <motion.div
                whileHover={{ y: -6 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-on-primary shadow-md"
                >
                  <Icon className="h-8 w-8" strokeWidth={1.75} />
                </motion.div>
                <h3 className="mb-3 text-[18px] font-semibold text-on-surface">
                  {benefit.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-on-surface-variant">
                  {benefit.description}
                </p>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
