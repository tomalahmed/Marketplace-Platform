export function getInitials(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}

export function formatPromptDate(date) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function estimateTokenCount(text = "") {
  if (!text) return 0;
  return Math.max(1, Math.round(text.trim().split(/\s+/).length * 1.3));
}

export function extractPlaceholders(content = "") {
  const matches = content.match(/\[([^\]]+)\]/g);
  if (!matches) return [];
  return [...new Set(matches.map((match) => match.slice(1, -1)))];
}

export function isPromptContentLocked(prompt, user) {
  if (!prompt?.contentLocked) return false;
  if (!user) return true;

  const creatorId =
    typeof prompt.creator === "object"
      ? prompt.creator?._id
      : prompt.creator;

  const isOwner = creatorId && String(creatorId) === String(user.id || user._id);
  const isAdmin = user.role === "admin";

  return !isOwner && !isAdmin && !user.isPremium;
}
