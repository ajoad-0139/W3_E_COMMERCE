"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

const ProductFilters = () => {
  return (
    <div className="w-[300px] shrink-0 rounded-xl border bg-card text-card-foreground p-5 flex flex-col gap-6 h-fit">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <h2 className="font-semibold text-card-foreground">Filters</h2>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      </div>

      {/* search by title */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-secondary-foreground">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* price range */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-secondary-foreground">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <span className="text-muted-foreground text-sm">–</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* category list */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-secondary-foreground">
          Category
        </label>
        <div className="flex flex-col gap-1 max-h-[240px] overflow-y-auto pr-1">
          <button
            type="button"
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-left bg-accent text-accent-foreground font-medium"
          >
            Clothes
          </button>
          <button
            type="button"
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-left text-secondary-foreground hover:bg-secondary transition-colors"
          >
            Electronics
          </button>
          <button
            type="button"
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-left text-secondary-foreground hover:bg-secondary transition-colors"
          >
            Furniture
          </button>
          <button
            type="button"
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-left text-secondary-foreground hover:bg-secondary transition-colors"
          >
            Shoes
          </button>
          <button
            type="button"
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-left text-secondary-foreground hover:bg-secondary transition-colors"
          >
            Miscellaneous
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;