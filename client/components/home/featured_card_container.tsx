"use client";

import { useState, useEffect } from "react";
import FeaturedCard from "./featured_card";
import type { Product } from "@/lib/types/product";

const getResponsiveConfig = () => {
  if (typeof window === "undefined") return { cardWidth: 224, gap: 16, visibleCards: 3 };
  const width = window.innerWidth;
  if (width < 640) return { cardWidth: 150, gap: 16, visibleCards: 1 };
  if (width < 1024) return { cardWidth: 190, gap: 16, visibleCards: 2 };
  return { cardWidth: 224, gap: 16, visibleCards: 3 };
};

export default function FeaturedCardContainer({Products}:{Products:Product[]}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [config, setConfig] = useState(getResponsiveConfig);

  const { cardWidth, gap, visibleCards } = config;
  const maxIndex = Math.max(Products.length - visibleCards, 0);

  useEffect(() => {
    const handleResize = () => {
      setConfig(getResponsiveConfig());
      setCurrentIndex(0);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <button type="button" onClick={previous} disabled={currentIndex === 0} className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border bg-card text-card-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40">
          ←
        </button>

        <button type="button" onClick={next} disabled={currentIndex === maxIndex} className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
          →
        </button>
      </div>
    </div>
  );
}