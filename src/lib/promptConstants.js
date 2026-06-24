export const PROMPT_CATEGORIES = [
  "Copywriting",
  "Design",
  "Coding",
  "Marketing",
  "Creative",
  "Productivity",
  "SEO",
  "Education",
];

export const AI_TOOLS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Midjourney",
  "GitHub Copilot",
  "DALL-E",
  "Stable Diffusion",
];

export const DIFFICULTY_LEVELS = ["Beginner", "Intermediate", "Pro"];

export const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Most Popular" },
  { value: "copies", label: "Most Copied" },
];

export const DEFAULT_PROMPT_FILTERS = {
  search: "",
  category: "",
  aiTool: "",
  difficulty: "",
  sort: "latest",
  page: 1,
  limit: 9,
};

export function formatCopyCount(count = 0) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(count);
}
