"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Palette, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/components/shared/FadeUp";

const ALL_TRENDING_TAGS = [
  "LogoDesign",
  "CodeAssistant",
  "SEOExpert",
  "Storytelling",
  "Midjourney",
  "EmailCopy",
  "Productivity",
  "DataAnalysis",
];

export default function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [trendingTags, setTrendingTags] = useState(
    ALL_TRENDING_TAGS.slice(0, 4)
  );

  useEffect(() => {
    const shuffled = [...ALL_TRENDING_TAGS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    setTrendingTags(shuffled);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    router.push(
      query ? `/prompts?search=${encodeURIComponent(query)}` : "/prompts"
    );
  };

  const handleTagClick = (tag) => {
    router.push(`/prompts?search=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary-container/10 blur-3xl"
        animate={{ y: [0, 18, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[18%] text-primary-container/20"
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Bot className="h-10 w-10" strokeWidth={1.5} />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[22%] text-secondary/25"
        animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Palette className="h-9 w-9" strokeWidth={1.5} />
      </motion.div>

      <StaggerContainer className="relative flex flex-col items-center text-center">
        <StaggerItem>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-outline-variant/25 bg-white/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            AI Prompt Marketplace
          </span>
        </StaggerItem>

        <StaggerItem>
          <h1 className="mb-6 max-w-4xl text-[36px] font-bold leading-[1.12] tracking-[-0.02em] text-primary md:text-[48px]">
            Master AI with the World&apos;s Best Prompts
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="mb-12 max-w-2xl text-[17px] leading-relaxed text-on-surface-variant md:text-[18px]">
            Discover, share, and monetize high-performance AI prompts for
            ChatGPT, Midjourney, and more. Fuel your creativity with organic
            precision.
          </p>
        </StaggerItem>

        <StaggerItem className="mb-8 w-full max-w-3xl">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompts for ChatGPT, Midjourney..."
              className="card-shadow w-full rounded-full border border-outline-variant/20 bg-white py-4 pl-6 pr-16 text-[16px] text-on-surface outline-none transition-all focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-primary-container text-on-primary transition-colors hover:bg-primary"
              aria-label="Search prompts"
            >
              <Search className="h-5 w-5" strokeWidth={2} />
            </motion.button>
          </form>
        </StaggerItem>

        <StaggerItem className="mb-12 w-full">
          <div className="flex flex-wrap justify-center gap-3">
            {trendingTags.map((tag, index) => (
              <motion.button
                key={tag}
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.08 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleTagClick(tag)}
                className="rounded-full border border-tertiary-fixed-dim/50 bg-tertiary-fixed px-3 py-1.5 text-[12px] font-semibold text-on-tertiary-fixed transition-colors hover:bg-tertiary-fixed-dim"
              >
                #{tag}
              </motion.button>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="flex flex-col gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/register"
                className="inline-flex rounded-lg bg-primary-container px-8 py-3 text-[14px] font-semibold text-on-primary transition-colors hover:bg-primary"
              >
                Start Creating
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/prompts"
                className="inline-flex rounded-lg border border-secondary bg-transparent px-8 py-3 text-[14px] font-semibold text-secondary transition-colors hover:bg-secondary/5"
              >
                Explore All
              </Link>
            </motion.div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
