import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

// Pure presentational piece — safe to render from server or client components.
export default function StarRating({ rating, size = 16, className = "" }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`Rated ${rating} out of 5`}>
      {stars.map((star) => {
        const filled = star <= Math.round(rating);
        return (
          <Star
            key={star}
            width={size}
            height={size}
            className={filled ? "fill-warning text-warning" : "fill-transparent text-muted-foreground"}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}