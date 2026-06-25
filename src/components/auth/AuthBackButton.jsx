"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AuthBackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="fixed left-4 top-4 z-[60] inline-flex items-center gap-2 rounded-full border border-outline-variant/25 bg-white/90 px-4 py-2.5 text-[14px] font-medium text-on-surface-variant shadow-sm backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-primary md:left-6 md:top-6"
      aria-label="Go back"
    >
      <ArrowLeft className="h-4 w-4" strokeWidth={2} />
      Back
    </button>
  );
}
