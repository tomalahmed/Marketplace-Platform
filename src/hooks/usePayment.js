import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

async function createCheckoutSession() {
  const { data } = await axiosInstance.post("/payments/create-checkout-session");
  return data.data;
}

async function verifyCheckoutSession(sessionId) {
  const { data } = await axiosInstance.post("/payments/verify-session", {
    sessionId,
  });
  return data.data;
}

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: createCheckoutSession,
  });
}

export function useVerifyCheckoutSession() {
  return useMutation({
    mutationFn: verifyCheckoutSession,
  });
}
