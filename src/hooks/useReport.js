import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

async function submitReport({ promptId, reason, description }) {
  const { data } = await axiosInstance.post(`/reports/${promptId}`, {
    reason,
    description,
  });
  return data;
}

export function useSubmitReport(promptId) {
  return useMutation({
    mutationFn: (payload) => submitReport({ promptId, ...payload }),
  });
}
