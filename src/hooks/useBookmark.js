import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosInstance";
import { getApiErrorMessage } from "@/lib/apiErrors";

async function checkBookmark(promptId) {
  const { data } = await axiosInstance.get(`/bookmarks/check/${promptId}`);
  return data;
}

async function toggleBookmark(promptId) {
  const { data } = await axiosInstance.post(`/bookmarks/${promptId}`);
  return data;
}

export function useBookmarkStatus(promptId, { enabled = true } = {}) {
  return useQuery({
    queryKey: ["bookmark", promptId],
    queryFn: () => checkBookmark(promptId),
    enabled: Boolean(promptId) && enabled,
    staleTime: 30 * 1000,
  });
}

export function useToggleBookmark(promptId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleBookmark(promptId),
    onSuccess: (response) => {
      queryClient.setQueryData(["bookmark", promptId], {
        success: true,
        bookmarked: response.bookmarked,
      });
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });

      if (response.bookmarked) {
        toast.success("Prompt bookmarked");
      } else {
        toast.success("Bookmark removed");
      }
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to update bookmark"));
    },
  });
}
