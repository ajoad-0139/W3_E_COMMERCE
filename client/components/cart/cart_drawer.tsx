"use client";

import { useEffect, useMemo, useState } from "react";

import {
  currentCartProducts,
  currentIsOpenCart,
  setCartProducts,
  toggleIsOpenCart,
} from "@/lib/redux/features/cart";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getCartProductIds } from "./cart_storage";


import CartItem from "./cart_item";
import CartSummary from "./cart_summary";

import type { Product } from "@/lib/types/product";
import { X } from "lucide-react";

export default function CartDrawer() {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(currentIsOpenCart);
  const products = useAppSelector(currentCartProducts);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCartProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const cartIds = getCartProductIds();

      if (cartIds.length === 0) {
        dispatch(setCartProducts([]));
        return;
      }

      const response = await fetch(
        "https://api.escuelajs.co/api/v1/products"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const allProducts: Product[] = await response.json();

      const cartProducts = allProducts.filter((product) =>
        cartIds.includes(String(product.id))
      );

      dispatch(setCartProducts(cartProducts));
    } catch (error) {
      console.error(error);

      setError("Unable to load your cart.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    loadCartProducts();
  }, [isOpen]);

  const subtotal = useMemo(() => {
    return products.reduce(
      (total, product) => total + product.price,
      0
    );
  }, [products]);

  return (
    <aside
      onClick={(e) => e.stopPropagation()}
      className={`
        absolute
        right-0
        top-0
        h-full
        w-full
        sm:w-[500px]
        max-w-full
        sm:max-w-[90vw]
        bg-background
        shadow-xl

        flex
        flex-col

        transform
        transition-transform
        duration-500
        ease-out

        ${
          isOpen
            ? "translate-x-0 delay-300"
            : "translate-x-full delay-0"
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b">
        <div>
            <button onClick={()=>dispatch(toggleIsOpenCart())} className="fixed top-5 right-5 cursor-pointer">
              <X className="text-red-600 font-extrabold"/>
            </button>
            <h2 className="text-base sm:text-lg font-semibold">
              Your Cart
            </h2>

          <p className="text-xs text-muted-foreground mt-1">
            {products.length}{" "}
            {products.length === 1 ? "item" : "items"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Loading cart...
            </p>
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-destructive">
              {error}
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-base font-medium">
              Your cart is empty
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Add some products to get started.
            </p>
          </div>
        ) : (
          <div>
            {products.map((product) => (
              <CartItem
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <CartSummary
        subtotal={subtotal}
        itemCount={products.length}
      />
    </aside>
  );
}