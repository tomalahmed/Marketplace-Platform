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
