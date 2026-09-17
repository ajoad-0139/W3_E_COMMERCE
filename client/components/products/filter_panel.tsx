"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductFilters from "./filter";

const FilterPanel = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop: original fixed sidebar, unchanged */}
      <div className="hidden lg:block h-[700px] w-[300px] fixed top-[135px] right-12">
        <ProductFilters onApplied={() => setOpen(false)} />
      </div>

      {/* Mobile/tablet: floating toggle button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-accent-foreground text-primary-foreground px-5 py-3 shadow-lg hover:bg-primary transition-colors"
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span className="text-sm font-medium">Filters</span>
      </button>

      {/* Mobile/tablet: slide-in drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative h-full w-[85%] max-w-[340px] bg-background overflow-y-auto p-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-destructive z-10"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mt-10">
              <ProductFilters onApplied={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;