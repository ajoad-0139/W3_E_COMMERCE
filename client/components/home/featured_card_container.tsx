"use client";

import { useState } from "react";
import FeaturedCard from "./featured_card";
import type { Product } from "@/lib/types/product";



export default function FeaturedCardContainer({Products}:{Products:Product[]}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = 3;
  const cardWidth = 224;
  const gap = 16;

  const maxIndex = Products.length - visibleCards;

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const previous = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full">
      {/* Viewport */}
      <div className="overflow-hidden">
        {/* Slider */}
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out content-stretch"
          style={{transform: `translateX(-${currentIndex * (cardWidth + gap) }px)`,}}>
          {Products.map((product) => (
            <FeaturedCard key={product.id} product={product}/>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex justify-end gap-2">
        <button type="button" onClick={previous} disabled={currentIndex === 0} className="flex h-10 w-10 items-center justify-center rounded-full border bg-card text-card-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40">
          ←
        </button>

        <button type="button" onClick={next} disabled={currentIndex === maxIndex} className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
          →
        </button>
      </div>
    </div>
  );
}