import { getDashboardPath } from "@/utils/roleRedirect";

const HOME = { href: "/", label: "Home", exact: true };
const MARKETPLACE = { href: "/prompts", label: "Marketplace" };
const ABOUT = { href: "/about", label: "About" };
const CREATORS = { href: "/#top-creators", label: "Creators", hash: true };
const PREMIUM = { href: "/pricing", label: "Premium" };

export const PUBLIC_NAV_LINKS = [HOME, MARKETPLACE, ABOUT, CREATORS, PREMIUM];

/** Logged-in users: Home and Marketplace only; role tools live in each dashboard sidebar. */
const AUTH_PUBLIC_NAV = [HOME, MARKETPLACE];

export function getMainNavLinks(user) {
  if (!user) return PUBLIC_NAV_LINKS;

  return AUTH_PUBLIC_NAV;
}

export function getDashboardLabel(role) {
  switch (role) {
    case "admin":
      return "Admin Panel";
    case "creator":
      return "Creator Hub";
    default:
      return "My Dashboard";
  }
}

export function getPrimaryAccountAction(user) {
  if (!user) return null;

  if (user.role === "creator") {
    return { href: "/creator/add-prompt", label: "Post Prompt" };
  }

  if (user.role === "admin") {
    return { href: "/admin/prompts", label: "Moderation" };
  }

  if (user.role === "user" && !user.isPremium) {
    return { href: "/pricing", label: "Upgrade" };
  }

  return null;
}

export function getDashboardHref(user) {
  if (!user) return "/user";
  return getDashboardPath(user.role);
}

export function isNavLinkActive(pathname, link) {
  if (link.hash) return false;
  if (link.exact) return pathname === link.href;

  if (link.matchPrefixes?.length) {
    return link.matchPrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    );
  }

  if (link.href === "/prompts") {
    return pathname === "/prompts" || pathname.startsWith("/prompts/");
  }

  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}
