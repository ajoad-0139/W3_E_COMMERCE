"use client";

import type { Category, Product } from "@/lib/types/product";
import {
  Search,
  SlidersHorizontal,
  X,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/redux/store";

import {
  currentSort,
  setProduct,
  setProductFilter,
  setSort,
} from "@/lib/redux/features/utils";

import { useAppSelector } from "@/lib/redux/hooks";

const API_BASE = "https://api.escuelajs.co/api/v1";

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest"
  | "oldest";

const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE}/categories`);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

const isValidCategory = (category: string): boolean => {
  return category.length <= 15;
};

const ProductFilters = ({ onApplied }: { onApplied?: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();

  const sort = useAppSelector(currentSort);

  const [categories, setCategories] = useState<Category[]>([]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [isApplying, setIsApplying] = useState(false);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const applyFilter = async () => {
    if (isApplying) return;

    setIsApplying(true);

    const params = new URLSearchParams();

    if (debouncedSearch.trim()) {
      params.set("title", debouncedSearch.trim());
    }

    if (minPrice) {
      params.set("price_min", minPrice);
    }

    if (maxPrice) {
      params.set("price_max", maxPrice);
    }

    if (selectedCategory) {
      params.set("categorySlug", selectedCategory);
    }

    try {
      const response = await fetch(
        `${API_BASE}/products?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const products: Product[] = await response.json();

      dispatch(
        setProductFilter({
          search: debouncedSearch.trim(),
          minPrice: minPrice
            ? Number(minPrice)
            : 0,
          maxPrice: maxPrice
            ? Number(maxPrice)
            : Number.MAX_SAFE_INTEGER,
          category: selectedCategory,
        })
      );

      // Keep products in their original order.
      // ProductList handles sorting for display.
      dispatch(setProduct(products));

      onApplied?.();
    } catch (error) {
      console.error("Failed to apply filters:", error);
    } finally {
      setIsApplying(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("");

    dispatch(setSort("default"));
    dispatch(setProductFilter(null));
  };

  return (
    <div className="w-full shrink-0 rounded-xl border bg-card text-card-foreground p-5 flex flex-col gap-6 h-fit">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />

          <h2 className="font-semibold text-card-foreground">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-secondary-foreground">
          Search
        </label>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-secondary-foreground">
          Price Range
        </label>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <span className="text-muted-foreground text-sm">
            –
          </span>

          <input
            type="number"
            min={0}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-secondary-foreground">
          Category
        </label>

        <div className="flex flex-col gap-1 max-h-[240px] overflow-y-auto scrollbar-hide pr-1">
          {categories.map((category) =>
            isValidCategory(category.name) ? (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  setSelectedCategory(
                    category.slug === selectedCategory
                      ? ""
                      : category.slug
                  )
                }
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm text-left transition-colors ${
                  selectedCategory === category.slug
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-secondary-foreground hover:bg-secondary"
                }`}
              >
                {category.name || "Missing name"}
              </button>
            ) : null
          )}
        </div>
      </div>

      {/* Sorting */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="sort"
          className="text-sm font-medium text-secondary-foreground"
        >
          Sort By
        </label>

        <select
          id="sort"
          value={sort}
          onChange={(e) => {
            dispatch(setSort(e.target.value as SortOption));
          }}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Apply */}
      <button
        type="button"
        onClick={applyFilter}
        disabled={isApplying}
        className="w-full py-2 rounded-md bg-accent-foreground hover:bg-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isApplying ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />

            <span className="text-sm text-primary-foreground">
              Applying...
            </span>
          </>
        ) : (
          <span className="text-sm text-primary-foreground">
            Apply Filter
          </span>
        )}
      </button>
    </div>
  );
};

export default ProductFilters;