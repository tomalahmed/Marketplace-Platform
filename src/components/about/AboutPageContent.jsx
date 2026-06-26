"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crown,
  Eye,
  Lock,
  Mail,
  Shield,
  Sparkles,
  Store,
  UserPlus,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import Button from "@/components/ui/Button";
import { CONTACT_EMAIL, getContactMailto } from "@/lib/contact";

const ACCESS_LEVELS = [
  {
    icon: Eye,
    title: "Visitors",
    description:
      "Browse the full marketplace catalog — titles, categories, creators, and ratings. Sign in or create a free account when you want to open a prompt's detail page.",
    cta: { href: "/prompts", label: "Browse Marketplace" },
  },
  {
    icon: Lock,
    title: "Free members",
    description:
      "Signed-in users can view prompt details. Pro (private) prompts stay blurred until you upgrade — you'll see a preview and an unlock path on the detail page.",
    cta: { href: "/register", label: "Create free account" },
  },
  {
    icon: Crown,
    title: "Premium members",
    description:
      "One-time payment unlocks every private prompt: full content, copy actions, and reviews. Your account upgrades automatically after checkout.",
    cta: { href: "/pricing", label: "View Premium" },
  },
  {
    icon: Sparkles,
    title: "Creators",
    description:
      "Creator accounts are assigned by our team so we can keep quality high. Want to publish and sell prompts? Contact the platform admin to request access.",
    cta: {
      href: getContactMailto("Creator access request"),
      label: "Contact admin",
      external: true,
    },
  },
];

export default function AboutPageContent() {
  return (
    <div className="mx-auto max-w-[960px] px-4 py-16 md:px-10">
      <FadeUp className="mb-12 text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-container/20 bg-primary-container/10 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-primary-container">
          <Store className="h-3.5 w-3.5" strokeWidth={2} />
          About PromptGrowth
        </span>
        <h1 className="mb-4 text-[36px] font-bold text-primary md:text-[42px]">
          The AI prompt marketplace built for clarity
        </h1>
        <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-on-surface-variant">
          PromptGrowth connects prompt creators with teams who need reliable,
          production-ready AI workflows. Everyone can explore the marketplace;
          deeper access depends on your role and membership.
        </p>
      </FadeUp>

      <FadeUp delay={0.05}>
        <div className="mb-14 grid gap-5 md:grid-cols-2">
          {ACCESS_LEVELS.map((level, index) => {
            const Icon = level.icon;

            return (
              <motion.div
                key={level.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex h-full flex-col rounded-3xl border border-outline-variant/15 bg-white p-6 shadow-[0_4px_24px_-4px_rgba(28,82,83,0.08)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-container text-on-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h2 className="mb-2 text-[20px] font-semibold text-on-surface">
                  {level.title}
                </h2>
                <p className="mb-5 flex-1 text-[15px] leading-relaxed text-on-surface-variant">
                  {level.description}
                </p>
                {level.cta.external ? (
                  <a
                    href={level.cta.href}
                    className="inline-flex text-[14px] font-semibold text-primary hover:underline"
                  >
                    {level.cta.label}
                  </a>
                ) : (
                  <Link
                    href={level.cta.href}
                    className="inline-flex text-[14px] font-semibold text-primary hover:underline"
                  >
                    {level.cta.label}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="rounded-3xl border border-outline-variant/15 bg-gradient-to-br from-primary-container/10 via-white to-tertiary-fixed/20 p-8 md:p-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-on-primary">
              <Shield className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h2 className="text-[22px] font-semibold text-on-surface">
              How access works
            </h2>
          </div>

          <ol className="mb-8 space-y-4 text-[15px] leading-relaxed text-on-surface-variant">
            <li className="flex gap-3">
              <UserPlus className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                <strong className="text-on-surface">Browse freely.</strong> Open
                the marketplace without an account and discover prompts by category
                and tool.
              </span>
            </li>
            <li className="flex gap-3">
              <Lock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                <strong className="text-on-surface">Sign in for details.</strong>{" "}
                Prompt detail pages require a free account so we can personalize
                bookmarks, reviews, and premium unlocks.
              </span>
            </li>
            <li className="flex gap-3">
              <Crown className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                <strong className="text-on-surface">Upgrade for Pro prompts.</strong>{" "}
                Private listings appear in the grid with a Pro badge and blurred
                preview. Payment upgrades your account instantly.
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                <strong className="text-on-surface">Creators work with admin.</strong>{" "}
                New accounts start as users. Email{" "}
                <a
                  href={getContactMailto("Creator access request")}
                  className="font-semibold text-primary hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                to request a creator role.
              </span>
            </li>
          </ol>

          <div className="flex flex-wrap gap-3">
            <Link href="/prompts">
              <Button>Explore Marketplace</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline">Go Premium</Button>
            </Link>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
