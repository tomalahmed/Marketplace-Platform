export const DEMO_PASSWORD = "Demo@12345";

export function isDemoAccount(email) {
  if (!email) return false;
  return DEMO_EMAILS.includes(String(email).trim().toLowerCase());
}

export function getDemoAccountByEmail(email) {
  return DEMO_ACCOUNTS.find((account) => account.email === email);
}

export function buildDemoLoginUrl({ email, redirect, autoLogin = true }) {
  const params = new URLSearchParams();
  params.set("demo", "1");
  params.set("email", email);
  if (redirect) {
    params.set("redirect", redirect);
  }
  if (autoLogin) {
    params.set("auto", "1");
  }
  return `/login?${params.toString()}`;
}

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
      "Admin account with full access to moderation, users, payments, and reports.",
    tryThese: [
      "Access the admin dashboard",
      "View all approved and pending prompts",
      "Test premium unlock on any private prompt",
    ],
  },
];

export const DEMO_EMAILS = DEMO_ACCOUNTS.map((account) => account.email);

export const DEMO_PROMPTS = [
  {
    id: "660ad2c3d56f9c2222222222",
    title: "Cyberpunk Cinematic Street Photography",
    visibility: "public",
    note: "Public featured prompt — visible on landing and marketplace.",
    demoEmail: "sarah.c@freeuser.io",
  },
  {
    id: "660ad2c3d56f9c1111111111",
    title: "Production-Ready Microservices Architect",
    visibility: "private",
    note: "Premium private prompt — locked for free users, unlocked for premium.",
    demoEmail: "sarah.c@freeuser.io",
    premiumDemoEmail: "alex.mercer@dev.com",
  },
  {
    id: "660ad2c3d56f9c3333333333",
    title: "Automated SQL Query Optimization Genius",
    visibility: "public",
    note: "Pending moderation — visible to creators/admins, not on public marketplace.",
    demoEmail: "elena.admin@promptmarket.com",
  },
];

export const DEMO_FEATURES = [
  { label: "Marketplace browse & filters", href: "/prompts" },
  { label: "Landing page & featured prompts", href: "/" },
  { label: "Premium lock on private prompt", href: "/prompts/660ad2c3d56f9c1111111111" },
  { label: "Pricing page", href: "/pricing" },
  { label: "Creator dashboard", demoEmail: "alex.mercer@dev.com", redirect: "/creator" },
  { label: "Admin moderation", demoEmail: "elena.admin@promptmarket.com", redirect: "/admin" },
];
