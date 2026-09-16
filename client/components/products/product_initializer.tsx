"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { Product } from "@/lib/types/product";
import type { AppDispatch } from "@/lib/redux/store";
import { setProduct } from "@/lib/redux/features/utils";

const ProductInitializer = ({
  products,
}: {
  products: Product[];
}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setProduct(products));
  }, [products, dispatch]);

  return null;
};

export default ProductInitializer;