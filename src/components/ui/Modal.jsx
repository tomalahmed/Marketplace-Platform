"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";

export default function Modal({
  open,
  onClose,
  title,
  children,
  className,
  showClose = true,
}) {
  useEffect(() => {
    if (!open) return undefined;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal backdrop"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={cn(
          "relative z-10 w-full max-w-lg rounded-2xl border border-outline-variant/20 bg-white p-6 shadow-[0_8px_32px_-4px_rgba(28,82,83,0.15)]",
          className
        )}
      >
        {(title || showClose) && (
          <div className="mb-4 flex items-start justify-between gap-4">
            {title && (
              <h2
                id="modal-title"
                className="text-[20px] font-semibold text-on-surface"
              >
                {title}
              </h2>
            )}
            {showClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="shrink-0 rounded-lg p-2"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </Button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
