"use client";

import { useEffect, useState } from "react";
import { getCartProductIds } from "@/components/cart/cart_storage";

export function useCart() {
  const [cartIds, setCartIds] = useState<string[]>([]);

  useEffect(() => {
    const syncCart = () => {
      setCartIds(getCartProductIds());
    };

    // Initial value
    syncCart();

    // Listen for changes from anywhere in the app
    window.addEventListener("cart-updated", syncCart);

    return () => {
      window.removeEventListener("cart-updated", syncCart);
    };
  }, []);

  return {
    cartIds,
    cartCount: cartIds.length,
  };
}