"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ProductCard from "@/components/products/product_card";
import type { Product } from "@/lib/types/product";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { currentProducts, currentProductsFilter, setProduct } from "@/lib/redux/features/utils";

const LIMIT = 20;

const getProducts = async (offset: number): Promise<Product[]> => {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${LIMIT}`
    );
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

const LoadMore = ({ initialOffset }: { initialOffset: number }) => {

  const dispatch = useAppDispatch();
  const products :Product[] = useAppSelector(currentProducts);

  // const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(initialOffset);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

    const filter = useAppSelector(currentProductsFilter);

    const isFilterActive =
      !!filter &&
      (
        filter.search.trim() !== "" ||
        filter.minPrice !== 0 ||
        filter.maxPrice !== 0 ||
        filter.category !== ""
      );

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
  if (
    loading ||
    !hasMore ||
    isFilterActive
  ) {
    return;
  }

  setLoading(true);

  try {
    const newProducts = await getProducts(offset);

    if (newProducts.length === 0) {
      setHasMore(false);
      return;
    }

    dispatch(
      setProduct([
        ...products,
        ...newProducts,
      ])
    );

    setOffset((prev) => prev + LIMIT);
  } finally {
    setLoading(false);
  }
}, [
  loading,
  hasMore,
  isFilterActive,
  offset,
  products,
  dispatch,
]);

  useEffect(() => {
  // Always disconnect existing observer first
  observerRef.current?.disconnect();

  // Don't create an observer while filtering
  if (isFilterActive) {
    return;
  }

  observerRef.current = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    },
    {
      rootMargin: "200px",
    }
  );

  if (sentinelRef.current) {
    observerRef.current.observe(
      sentinelRef.current
    );
  }

  return () => {
    observerRef.current?.disconnect();
  };
}, [isFilterActive, loadMore]);
  return (
    <>
      {products.map((product: Product, index:number) => (
        <ProductCard key={product.id+index} product={product} />
      ))}

      {/* sentinel + loading state */}
      <div ref={sentinelRef} className="w-full flex justify-center py-6">
        {loading && (
          <p className="text-sm text-muted-foreground">Loading more products...</p>
        )}
        {!hasMore && (
          <p className="text-sm text-muted-foreground">No more products.</p>
        )}
      </div>
    </>
  );
};

export default LoadMore;