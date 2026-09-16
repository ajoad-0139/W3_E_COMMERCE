"use client";

import type { Product, SortOption } from "@/lib/types/product";
import ProductCard from "@/components/products/product_card";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  currentProducts,
  currentSort,
} from "@/lib/redux/features/utils";

const sortProducts = (
  products: Product[],
  sort: SortOption
): Product[] => {
  const result = [...products];

  switch (sort) {
    case "price-asc":
      return result.sort((a, b) => a.price - b.price);

    case "price-desc":
      return result.sort((a, b) => b.price - a.price);

    case "name-asc":
      return result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    case "name-desc":
      return result.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

    case "newest":
      return result.sort((a, b) => b.id - a.id);

    case "oldest":
      return result.sort((a, b) => a.id - b.id);

    default:
      return result;
  }
};

const ProductList = () => {
  const products = useAppSelector(currentProducts);
  const sort = useAppSelector(currentSort);

  const sortedProducts = sortProducts(products, sort);

  return (
    <>
      {sortedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </>
  );
};

export default ProductList;