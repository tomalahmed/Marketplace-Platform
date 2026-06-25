import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

async function fetchPromptById(id) {
  const { data } = await axiosInstance.get(`/prompts/${id}`);
  return data;
}

async function incrementCopyCount(id) {
  const { data } = await axiosInstance.patch(`/prompts/${id}/copy`);
  return data;
}

export function usePrompt(id) {
  return useQuery({
    queryKey: ["prompt", id],
    queryFn: () => fetchPromptById(id),
    enabled: Boolean(id),
  });
}

export function useIncrementCopy(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => incrementCopyCount(id),
    onSuccess: (response) => {
      queryClient.setQueryData(["prompt", id], (current) => {
        if (!current?.data) return current;
        return {
          ...current,
          data: {
            ...current.data,
            copyCount: response.data?.copyCount ?? current.data.copyCount,
          },
        };
      });
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });
}
