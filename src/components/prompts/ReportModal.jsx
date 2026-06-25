"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { useSubmitReport } from "@/hooks/useReport";
import { getApiErrorMessage } from "@/lib/apiErrors";

const REPORT_REASONS = [
  { value: "Inappropriate", label: "Inappropriate content" },
  { value: "Inaccurate", label: "Inaccurate content" },
  { value: "Spam", label: "Spam or misleading" },
  { value: "Offensive", label: "Offensive or harmful" },
  { value: "Copyright", label: "Copyright concern" },
  { value: "Other", label: "Other" },
];

export default function ReportModal({ open, onClose, promptId, promptTitle }) {
  const [reason, setReason] = useState(REPORT_REASONS[0].value);
  const [details, setDetails] = useState("");
  const reportMutation = useSubmitReport(promptId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await reportMutation.mutateAsync({
        reason,
        description: details,
      });
      toast.success("Report submitted. Our team will review it shortly.");
      setDetails("");
      setReason(REPORT_REASONS[0].value);
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to submit report"));
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Report Prompt">
      <p className="mb-4 text-[14px] text-on-surface-variant">
        Flag &ldquo;{promptTitle}&rdquo; if it violates marketplace guidelines.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="report-reason"
            className="mb-1.5 block text-[13px] font-semibold text-on-surface"
          >
            Reason
          </label>
          <Select
            id="report-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            options={REPORT_REASONS}
            placeholder=""
          />
        </div>
        <div>
          <label
            htmlFor="report-details"
            className="mb-1.5 block text-[13px] font-semibold text-on-surface"
          >
            Additional details (optional)
          </label>
          <textarea
            id="report-details"
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Describe the issue..."
            className="w-full rounded-xl border border-outline-variant/25 bg-white px-4 py-3 text-[14px] text-on-surface outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={reportMutation.isPending}>
            {reportMutation.isPending ? "Submitting..." : "Submit Report"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
