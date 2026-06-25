"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Brush,
  Code2,
  MessageSquare,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";
import FadeUp, { StaggerContainer, StaggerItem } from "@/components/shared/FadeUp";

const tools = [
  { name: "ChatGPT", icon: MessageSquare, color: "bg-emerald-100 text-emerald-700" },
  { name: "Claude", icon: Bot, color: "bg-orange-100 text-orange-700" },
  { name: "Gemini", icon: Sparkles, color: "bg-blue-100 text-blue-700" },
  { name: "Midjourney", icon: Palette, color: "bg-purple-100 text-purple-700" },
  { name: "GitHub Copilot", icon: Code2, color: "bg-slate-100 text-slate-700" },
  { name: "DALL-E", icon: Brush, color: "bg-pink-100 text-pink-700" },
  { name: "Stable Diffusion", icon: Zap, color: "bg-indigo-100 text-indigo-700" },
  { name: "Cursor", icon: Code2 , color: "bg-gray-100 text-gray-700" },
];

export default function SupportedAiToolsSection() {
  return (
    <section className="py-16">
      <FadeUp className="mb-12 text-center">
        <h2 className="mb-4 text-[28px] font-bold text-primary md:text-[32px]">
          Supported AI Tools
        </h2>
        <p className="mx-auto max-w-2xl text-[17px] text-on-surface-variant">
          Prompts optimized for the models and platforms you already use every day.
        </p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <StaggerItem key={tool.name}>
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-outline-variant/15 bg-white p-6 text-center shadow-sm"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${tool.color}`}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <span className="text-[14px] font-semibold text-on-surface">
                  {tool.name}
                </span>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
