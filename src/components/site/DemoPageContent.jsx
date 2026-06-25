"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Crown,
  KeyRound,
  Lock,
  Shield,
  Sparkles,
  User,
} from "lucide-react";
import { toast } from "react-toastify";
import FadeUp from "@/components/shared/FadeUp";
import Button from "@/components/ui/Button";
import {
  DEMO_ACCOUNTS,
  DEMO_FEATURES,
  DEMO_PASSWORD,
  DEMO_PROMPTS,
} from "@/lib/demoAccounts";

const roleStyles = {
  creator: "bg-emerald-100 text-emerald-800",
  user: "bg-blue-100 text-blue-800",
  admin: "bg-amber-100 text-amber-800",
};

async function copyText(value, label) {
  try {
    await navigator.clipboard.writeText(value);
    toast.success(`${label} copied`);
  } catch {
    toast.error("Could not copy to clipboard");
  }
}

export default function DemoPageContent() {
  return (
    <div className="mx-auto max-w-[960px] px-4 py-12 md:px-10 md:py-16">
      <FadeUp className="mb-10 text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-container/20 bg-primary-container/10 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-primary-container">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
          Live Demo
        </span>
        <h1 className="mb-4 text-[32px] font-bold text-primary md:text-[40px]">
          Try PromptGrowth
        </h1>
        <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-on-surface-variant">
          Use the demo accounts below to log in and explore the marketplace,
          premium locks, prompt details, and role-based dashboards. All accounts
          share the same password.
        </p>
      </FadeUp>

      <FadeUp delay={0.05}>
        <section className="mb-10 rounded-2xl border border-primary-container/20 bg-gradient-to-br from-primary-container/10 via-white to-tertiary-fixed/20 p-6 md:p-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary">
                <KeyRound className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="text-[18px] font-semibold text-on-surface">
                  Shared demo password
                </h2>
                <p className="font-mono text-[20px] font-bold text-primary">
                  {DEMO_PASSWORD}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => copyText(DEMO_PASSWORD, "Password")}
            >
              <Copy className="h-4 w-4" strokeWidth={1.75} />
              Copy password
            </Button>
          </div>
          <p className="mt-4 text-[14px] text-on-surface-variant">
            Run <code className="rounded bg-surface-container-high px-1.5 py-0.5 text-[13px]">npm run seed</code> on the server if accounts are missing.
          </p>
        </section>
      </FadeUp>

      <div className="mb-10 grid gap-6">
        {DEMO_ACCOUNTS.map((account, index) => (
          <FadeUp key={account.email} delay={0.08 + index * 0.05}>
            <motion.article
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-outline-variant/20 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(28,82,83,0.08)] md:p-8"
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-[20px] font-semibold text-on-surface">
                      {account.name}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${roleStyles[account.role]}`}
                    >
                      {account.role}
                    </span>
                    {account.isPremium ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
                        <Crown className="h-3 w-3" strokeWidth={2} />
                        Premium
                      </span>
                    ) : (
                      <span className="rounded-full bg-surface-container-high px-2.5 py-0.5 text-[11px] font-semibold text-on-surface-variant">
                        Free
                      </span>
                    )}
                  </div>
                  <p className="text-[15px] text-on-surface-variant">
                    {account.description}
                  </p>
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-3 rounded-xl bg-surface-container-low/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 font-mono text-[14px] text-on-surface">
                  <User className="h-4 w-4 shrink-0 text-primary-container" strokeWidth={1.75} />
                  {account.email}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyText(account.email, "Email")}
                  >
                    <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
                    Copy email
                  </Button>
                  <Link href={`/login?redirect=${encodeURIComponent(account.dashboard)}`}>
                    <Button size="sm">
                      Log in as {account.role}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </Button>
                  </Link>
                </div>
              </div>

              <ul className="space-y-2">
                {account.tryThese.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[14px] text-on-surface-variant"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary-container"
                      strokeWidth={1.75}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.2}>
        <section className="mb-10 rounded-2xl border border-outline-variant/20 bg-white p-6 md:p-8">
          <h2 className="mb-6 text-[24px] font-semibold text-primary">
            Sample prompts to test
          </h2>
          <div className="space-y-4">
            {DEMO_PROMPTS.map((prompt) => (
              <div
                key={prompt.id}
                className="flex flex-col gap-3 rounded-xl border border-outline-variant/15 bg-surface-container-low/50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-on-surface">
                      {prompt.title}
                    </h3>
                    {prompt.visibility === "private" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800">
                        <Lock className="h-3 w-3" strokeWidth={2} />
                        Premium
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-primary-container">
                        Public
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-on-surface-variant">{prompt.note}</p>
                </div>
                <Link href={`/login?redirect=${encodeURIComponent(`/prompts/${prompt.id}`)}`}>
                  <Button size="sm" variant="outline">
                    View prompt
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </FadeUp>

      <FadeUp delay={0.25}>
        <section className="rounded-2xl border border-outline-variant/20 bg-white p-6 md:p-8">
          <h2 className="mb-6 text-[24px] font-semibold text-primary">
            What you can explore
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {DEMO_FEATURES.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="flex items-center justify-between rounded-xl border border-outline-variant/15 px-4 py-3 text-[14px] font-medium text-on-surface transition-colors hover:border-primary-container/30 hover:bg-surface-container-low"
              >
                {feature.label}
                <ArrowRight className="h-4 w-4 text-primary-container" strokeWidth={2} />
              </Link>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 text-[13px] text-on-surface-variant">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary-container" strokeWidth={1.75} />
            Demo data is for evaluation only. Do not use real passwords or production
            credentials on this environment.
          </p>
        </section>
      </FadeUp>
    </div>
  );
}
