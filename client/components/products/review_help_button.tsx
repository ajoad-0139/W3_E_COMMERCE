"use client";

import { useState } from "react";
import { ThumbsUp } from "lucide-react";

interface ReviewHelpfulButtonProps {
  initialCount: number;
}

// Kept as its own tiny client island so the rest of the reviews list
// (product-reviews.tsx) can stay a server component.
export default function ReviewHelpfulButton({ initialCount }: ReviewHelpfulButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(false);

  const handleClick = () => {
    if (voted) return;
    setCount((c) => c + 1);
    setVoted(true);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={voted}
      className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors ${
        voted ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <ThumbsUp size={14} className={voted ? "fill-primary" : ""} />
      Helpful ({count})
    </button>
  );
}