"use client";

import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import { getInitials } from "@/lib/promptUtils";

const PLACEHOLDER_REVIEWS = [
  {
    id: "1",
    name: "John Doe",
    initials: "JD",
    color: "bg-secondary-container text-on-secondary-container",
    rating: 5,
    date: "2 days ago",
    comment:
      "Excellent prompt! Saved me hours of brainstorming. The structure it provides is exactly what I needed for our new product launch.",
  },
  {
    id: "2",
    name: "Alice Smith",
    initials: "AS",
    color: "bg-primary-container text-on-primary-container",
    rating: 4,
    date: "1 week ago",
    comment:
      "Very solid framework. Had to tweak the output a bit to fit our specific brand voice, but the foundation it gives is incredibly strong.",
  },
];

export default function PromptReviewsSection({
  prompt,
  contentLocked,
  StarRating,
}) {
  const averageRating = prompt.averageRating || 0;
  const reviewCount = prompt.reviewCount || 0;
  const reviews =
    reviewCount > 0 ? PLACEHOLDER_REVIEWS : [];

  const handleWriteReview = () => {
    if (contentLocked) {
      toast.info("Subscribe to Premium to leave a review");
      return;
    }
    toast.info("Review submission coming in Phase 3");
  };

  return (
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

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-[15px] text-on-surface-variant">
            No reviews yet. Be the first to share feedback after using this prompt.
          </p>
        ) : (
          reviews.map((review) => (
          <article
            key={review.id}
            className="border-b border-outline-variant/20 pb-6 last:border-0 last:pb-0"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${review.color}`}
                >
                  {review.initials || getInitials(review.name)}
                </div>
                <div>
                  <div className="text-[14px] font-bold text-on-surface">
                    {review.name}
                  </div>
                  <div className="text-[12px] text-on-surface-variant">
                    {review.date}
                  </div>
                </div>
              </div>
              <StarRating rating={review.rating} size="sm" />
            </div>
            <p className="text-[16px] leading-relaxed text-on-surface-variant">
              {review.comment}
            </p>
          </article>
          ))
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => toast.info("More reviews coming in Phase 3")}
        >
          Load More Reviews
        </Button>
        <Button
          className="w-full"
          onClick={handleWriteReview}
          disabled={contentLocked}
        >
          Write a Review
        </Button>
      </div>
    </section>
  );
}
