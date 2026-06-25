import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { DEFAULT_PROMPT_FILTERS } from "@/lib/promptConstants";

function buildPromptParams(filters = {}) {
  const params = new URLSearchParams();
  const merged = { ...DEFAULT_PROMPT_FILTERS, ...filters };

  Object.entries(merged).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

async function fetchPrompts(filters) {
  const query = buildPromptParams(filters);
  const { data } = await axiosInstance.get(`/prompts?${query}`);
  return data;
}

async function fetchFeaturedPrompts() {
  const { data } = await axiosInstance.get("/prompts/featured");
  return data;
}

export function usePrompts(filters = {}, options = {}) {
  const queryFilters = { ...DEFAULT_PROMPT_FILTERS, ...filters };

  return useQuery({
    queryKey: ["prompts", queryFilters],
    queryFn: () => fetchPrompts(queryFilters),
    placeholderData: (previousData) => previousData,
    enabled: options.enabled ?? true,
  });
}

export function useFeaturedPrompts() {
  return useQuery({
    queryKey: ["prompts", "featured"],
    queryFn: fetchFeaturedPrompts,
    staleTime: 2 * 60 * 1000,
  });
}

export default usePrompts;
