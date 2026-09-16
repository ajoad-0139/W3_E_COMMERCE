import type { RatingBreakdown, RatingSummary, Review } from "@/lib/types/product";

export function getReviews(): Review[] {
  return [
    {
      id: "r1",
      author: "Priyanka M.",
      rating: 5,
      date: "2026-08-02",
      title: "Exactly as described",
      body:
        "Product matched the photos and description closely. Packaging was solid and it arrived well ahead of the estimated date.",
      verifiedPurchase: true,
      helpfulCount: 42,
    },
    {
      id: "r2",
      author: "David R.",
      rating: 4,
      date: "2026-07-21",
      title: "Good value, minor wear on arrival",
      body:
        "Overall happy with it. There was a small scuff on one corner out of the box, but nothing that affects how it works day to day.",
      verifiedPurchase: true,
      helpfulCount: 18,
    },
    {
      id: "r3",
      author: "Ayesha K.",
      rating: 5,
      date: "2026-07-10",
      title: "Better than expected",
      body:
        "Wasn't sure what to expect at this price but the build quality feels solid. Would order again without hesitation.",
      verifiedPurchase: true,
      helpfulCount: 27,
    },
    {
      id: "r4",
      author: "Marcus T.",
      rating: 3,
      date: "2026-06-29",
      title: "Does the job",
      body:
        "Nothing special but nothing wrong either. Does exactly what's described, delivery took a couple of extra days.",
      verifiedPurchase: false,
      helpfulCount: 9,
    }
  ];
}

export function getRatingBreakdown(): RatingBreakdown[] {
  return [
    { star: 5, percentage: 68 },
    { star: 4, percentage: 21 },
    { star: 3, percentage: 7 },
    { star: 2, percentage: 3 },
    { star: 1, percentage: 1 },
  ];
}

export function getRatingSummary(): RatingSummary {
  const reviews = getReviews();
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return { average, count: reviews.length };
}