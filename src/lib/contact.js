export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "admin@promtgrowth.ai";

export function getContactMailto(subject = "PromptGrowth inquiry") {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
