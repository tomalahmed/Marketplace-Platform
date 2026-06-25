export const DEMO_PASSWORD = "Demo@12345";

export const DEMO_ACCOUNTS = [
  {
    name: "Alex Mercer",
    email: "alex.mercer@dev.com",
    role: "creator",
    isPremium: true,
    dashboard: "/creator",
    description:
      "Premium creator account. Can view private prompts, copy content, and access the creator dashboard.",
    tryThese: [
      "View premium-locked prompt (Microservices Architect)",
      "Copy prompt content and see copy count increment",
      "Browse marketplace as a logged-in creator",
    ],
  },
  {
    name: "Sarah Connor",
    email: "sarah.c@freeuser.io",
    role: "user",
    isPremium: false,
    dashboard: "/user",
    description:
      "Free tier user. Great for testing premium lock overlays and upgrade flows.",
    tryThese: [
      "Open a private prompt and see the premium blur lock",
      "Browse public prompts on the marketplace",
      "Visit pricing to preview the upgrade path",
    ],
  },
  {
    name: "Elena Rostova",
    email: "elena.admin@promptmarket.com",
    role: "admin",
    isPremium: true,
    dashboard: "/admin",
    description:
      "Admin account with full access including moderation dashboards (Phase 5).",
    tryThese: [
      "Access the admin dashboard",
      "View all approved and pending prompts",
      "Test premium unlock on any private prompt",
    ],
  },
];

export const DEMO_PROMPTS = [
  {
    id: "660ad2c3d56f9c2222222222",
    title: "Cyberpunk Cinematic Street Photography",
    visibility: "public",
    note: "Public featured prompt — visible on landing and marketplace.",
  },
  {
    id: "660ad2c3d56f9c1111111111",
    title: "Production-Ready Microservices Architect",
    visibility: "private",
    note: "Premium private prompt — locked for free users, unlocked for premium.",
  },
  {
    id: "660ad2c3d56f9c3333333333",
    title: "Automated SQL Query Optimization Genius",
    visibility: "public",
    note: "Pending moderation — visible to creators/admins, not on public marketplace.",
  },
];

export const DEMO_FEATURES = [
  { label: "Marketplace browse & filters", href: "/prompts" },
  { label: "Landing page & featured prompts", href: "/" },
  { label: "Prompt detail, copy & premium lock", href: "/prompts/660ad2c3d56f9c1111111111" },
  { label: "Pricing page", href: "/pricing" },
  { label: "Login & register", href: "/login" },
];
