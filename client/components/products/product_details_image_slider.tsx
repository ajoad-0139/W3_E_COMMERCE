"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageSliderProps {
  images: string[];
  title: string;
}

export default function ProductImageSlider({ images, title }: ProductImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = images.length > 0;

  const goTo = (index: number) => {
    const next = (index + images.length) % images.length;
    setActiveIndex(next);
  };

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="group relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-card">
        {hasImages ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images[activeIndex]}
            alt={`${title} — image ${activeIndex + 1} of ${images.length}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            No image available
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-card focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-card focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-card/90 px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex}
              className={`aspect-square overflow-hidden rounded-lg border transition-colors ${
                index === activeIndex
                  ? "border-primary ring-1 ring-primary"
                  : "border-border hover:border-muted-foreground/40"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}