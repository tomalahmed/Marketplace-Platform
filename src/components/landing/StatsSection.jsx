"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, FileText, Star, Users } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/shared/FadeUp";

const STATS = [
  { value: 12000, suffix: "+", label: "Prompts Listed", icon: FileText },
  { value: 850, suffix: "+", label: "Active Creators", icon: Users },
  { value: 1.2, suffix: "M+", label: "Total Copies", icon: Copy, decimals: 1 },
  { value: 4.9, suffix: "", label: "Avg. Rating", icon: Star, decimals: 1 },
];

function AnimatedValue({ value, suffix = "", decimals = 0, duration = 1.4 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = null;
    let frameId;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-8">
      <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <StaggerItem key={stat.label}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex flex-col items-center rounded-2xl border border-outline-variant/15 bg-white px-4 py-6 text-center shadow-sm md:px-6"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container/10 text-primary-container">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <p className="text-[24px] font-bold text-primary md:text-[28px]">
                  <AnimatedValue
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </p>
                <p className="mt-1 text-[13px] font-medium text-on-surface-variant">
                  {stat.label}
                </p>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
