import { BadgeCheck } from "lucide-react";
import StarRating from "./product_star_rating";
import ReviewHelpfulButton from "./review_help_button";
import { getRatingBreakdown, getReviews } from "@/public/mock_review_data";

// NOTE: reviews are hardcoded in lib/mock-reviews.ts until a reviews endpoint
// exists. Swap getReviews()/getRatingBreakdown() for real fetches later —
// the rest of this component (a server component) won't need to change.
export default function ProductReviews() {
  const reviews = getReviews();
  const breakdown = getRatingBreakdown();
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Customer reviews</h2>

      {/* Summary */}
      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex shrink-0 flex-col items-start sm:items-center">
          <span className="text-4xl font-semibold text-foreground">{average.toFixed(1)}</span>
          <StarRating rating={average} size={18} className="mt-1" />
          <span className="mt-1 text-xs text-muted-foreground">{reviews.length} reviews</span>
        </div>

        <div className="flex-1 space-y-1.5">
          {breakdown.map((row) => (
            <div key={row.star} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-3">{row.star}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-warning" style={{ width: `${row.percentage}%` }} />
              </div>
              <span className="w-8 text-right">{row.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="my-6 h-px bg-border" />

      {/* Review list */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <article key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{review.author}</span>
                  {review.verifiedPurchase && (
                    <span className="flex items-center gap-1 text-xs text-success">
                      <BadgeCheck size={13} />
                      Verified purchase
                    </span>
                  )}
                </div>
                <StarRating rating={review.rating} size={13} className="mt-1" />
              </div>
              <time dateTime={review.date} className="shrink-0 text-xs text-muted-foreground">
                {new Date(review.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>

            <h3 className="mt-3 text-sm font-medium text-foreground">{review.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{review.body}</p>

            <div className="mt-2">
              <ReviewHelpfulButton initialCount={review.helpfulCount} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}