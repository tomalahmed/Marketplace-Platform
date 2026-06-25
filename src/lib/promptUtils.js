export function dedupePromptsById(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const id = String(item?._id);
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

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

export function formatRelativeDate(date) {
  if (!date) return "—";

  const diffMs = Date.now() - new Date(date).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${days >= 14 ? "s" : ""} ago`;

  return formatPromptDate(date);
}

const AVATAR_COLORS = [
  "bg-secondary-container text-on-secondary-container",
  "bg-primary-container text-on-primary-container",
  "bg-tertiary-container text-on-tertiary-container",
];

export function getAvatarColorClass(seed = "") {
  const hash = String(seed)
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
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
  if (!prompt) return false;

  const creatorId =
    typeof prompt.creator === "object"
      ? prompt.creator?._id
      : prompt.creator;

  const isOwner =
    user && creatorId && String(creatorId) === String(user.id || user._id);
  const isAdmin = user?.role === "admin";

  if (isOwner || isAdmin) return false;
  if (prompt.visibility === "private" && !user?.isPremium) return true;

  return Boolean(prompt.contentLocked);
}
