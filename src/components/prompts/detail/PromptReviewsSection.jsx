"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import useAuth from "@/hooks/useAuth";
import { usePromptReviews, useSubmitReview } from "@/hooks/useReviews";
import { getApiErrorMessage } from "@/lib/apiErrors";
import {
  formatRelativeDate,
  getAvatarColorClass,
  getInitials,
} from "@/lib/promptUtils";

function StarPicker({ value, onChange, disabled }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const rating = index + 1;
        const active = rating <= value;

        return (
          <button
            key={rating}
            type="button"
            disabled={disabled}
            onClick={() => onChange(rating)}
            className="rounded p-1 transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed"
            aria-label={`Rate ${rating} stars`}
          >
            <Star
              className={`h-6 w-6 ${
                active ? "fill-tertiary-container text-tertiary-container" : "text-outline-variant/40"
              }`}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function PromptReviewsSection({
  prompt,
  contentLocked,
  StarRating,
}) {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const limit = 5;
  const { data, isLoading, isFetching } = usePromptReviews(prompt._id, page, limit);
  const submitMutation = useSubmitReview(prompt._id);
  const [loadedReviews, setLoadedReviews] = useState([]);

  useEffect(() => {
    if (!data?.data) return;

    setLoadedReviews((current) => {
      if (page === 1) return data.data;

      const existingIds = new Set(current.map((review) => String(review._id)));
      const nextReviews = data.data.filter(
        (review) => !existingIds.has(String(review._id))
      );

      return [...current, ...nextReviews];
    });
  }, [data, page]);

  const reviews = loadedReviews;
  const pagination = data?.pagination;
  const averageRating = prompt.averageRating || 0;
  const reviewCount = prompt.reviewCount || pagination?.totalCount || 0;
  const hasMore = pagination?.hasNextPage;

  const handleWriteReview = () => {
    if (!user) {
      toast.info("Sign in to leave a review");
      return;
    }

    if (contentLocked) {
      toast.info("Subscribe to Premium to leave a review");
      return;
    }

    setReviewOpen(true);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please add a comment to your review");
      return;
    }

    try {
      await submitMutation.mutateAsync({ rating, comment: comment.trim() });
      toast.success("Review submitted successfully");
      setComment("");
      setRating(5);
      setReviewOpen(false);
      setPage(1);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to submit review"));
    }
  };

  return (
    <>
      <section className="rounded-2xl border border-outline-variant/20 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(28,82,83,0.08)] md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[24px] font-semibold text-primary">Reviews & Ratings</h2>
          <div className="flex items-center gap-2">
            <span className="text-[24px] font-bold text-on-surface">
              {reviewCount > 0 ? averageRating.toFixed(1) : "—"}
            </span>
            {reviewCount > 0 && <StarRating rating={averageRating} />}
            <span className="text-[12px] text-on-surface-variant">
              ({reviewCount} reviews)
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner label="Loading reviews..." />
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-[15px] text-on-surface-variant">
                No reviews yet. Be the first to share feedback after using this prompt.
              </p>
            ) : (
              reviews.map((review) => {
                const reviewer = review.user || {};
                const reviewerName = reviewer.name || "Anonymous";

                return (
                  <article
                    key={review._id}
                    className="border-b border-outline-variant/20 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {reviewer.photoURL ? (
                          <img
                            src={reviewer.photoURL}
                            alt={reviewerName}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${getAvatarColorClass(reviewerName)}`}
                          >
                            {getInitials(reviewerName)}
                          </div>
                        )}
                        <div>
                          <div className="text-[14px] font-bold text-on-surface">
                            {reviewerName}
                          </div>
                          <div className="text-[12px] text-on-surface-variant">
                            {formatRelativeDate(review.createdAt)}
                          </div>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-[16px] leading-relaxed text-on-surface-variant">
                      {review.comment}
                    </p>
                  </article>
                );
              })
            )}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {hasMore && (
            <Button
              variant="outline"
              className="w-full"
              disabled={isFetching}
              onClick={() => setPage((current) => current + 1)}
            >
              {isFetching ? "Loading..." : "Load More Reviews"}
            </Button>
          )}
          <Button
            className="w-full"
            onClick={handleWriteReview}
            disabled={contentLocked}
          >
            Write a Review
          </Button>
        </div>
      </section>

      <Modal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        title="Write a Review"
      >
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="mb-2 block text-[13px] font-semibold text-on-surface">
              Your rating
            </label>
            <StarPicker
              value={rating}
              onChange={setRating}
              disabled={submitMutation.isPending}
            />
          </div>
          <div>
            <label
              htmlFor="review-comment"
              className="mb-1.5 block text-[13px] font-semibold text-on-surface"
            >
              Comment
            </label>
            <textarea
              id="review-comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share how this prompt worked for you..."
              className="w-full rounded-xl border border-outline-variant/25 bg-white px-4 py-3 text-[14px] text-on-surface outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
              disabled={submitMutation.isPending}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setReviewOpen(false)}
              disabled={submitMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={submitMutation.isPending}>
              {submitMutation.isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
