"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";

import StarRating from "./product_star_rating";
import type { Product, RatingSummary } from "@/lib/types/product";

import {
  addProductToCart,
  isProductInCart,
  removeProductFromCart,
} from "../cart/cart_storage";
import { useCart } from "@/hooks/use_cart";

interface ProductInfoProps {
  product: Product;
  ratingSummary: RatingSummary;
}

export default function ProductInfo({
  product,
  ratingSummary,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
//   const [isProdInCart, setIsProdInCart] = useState(false);

//   useEffect(() => {
//     setIsProdInCart(isProductInCart(String(product.id)));
//   }, [product.id]);


const { cartIds } = useCart();

const isProdInCart = cartIds.includes(String(product.id));

const handleCartToggle = () => {
  const productId = String(product.id);

  if (isProdInCart) {
    removeProductFromCart(productId);
  } else {
    addProductToCart(productId);
  }
};

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <span className="inline-block rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
        {product.category.name}
      </span>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
        {product.title}
      </h1>

      <div className="mt-2 flex items-center gap-2">
        <StarRating rating={ratingSummary.average} />

        <span className="text-sm text-muted-foreground">
          {ratingSummary.average.toFixed(1)} ·{" "}
          {ratingSummary.count.toLocaleString()} reviews
        </span>
      </div>

      <div className="mt-4 text-3xl font-semibold text-foreground">
        ${product.price.toFixed(2)}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      <div className="my-6 h-px bg-border" />

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center justify-between rounded-lg border border-input sm:w-32">
          <button
            type="button"
            onClick={() =>
              setQuantity((q) => Math.max(1, q - 1))
            }
            aria-label="Decrease quantity"
            className="flex h-10 w-10 items-center justify-center text-foreground hover:bg-secondary disabled:opacity-40"
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </button>

          <span className="w-6 text-center text-sm font-medium text-foreground">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              setQuantity((q) => Math.min(10, q + 1))
            }
            aria-label="Increase quantity"
            className="flex h-10 w-10 items-center justify-center text-foreground hover:bg-secondary disabled:opacity-40"
            disabled={quantity >= 10}
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={handleCartToggle}
          type="button"
          className={`flex-1 rounded-lg px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors ${
            isProdInCart
              ? "bg-red-900 hover:bg-red-800"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isProdInCart ? "Remove From Cart" : "Add To Cart"}
        </button>

        <button
          type="button"
          className="flex-1 rounded-lg border border-input bg-transparent px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Buy now
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Truck size={16} className="shrink-0" />
          Free shipping over $50
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RotateCcw size={16} className="shrink-0" />
          30-day easy returns
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck size={16} className="shrink-0" />
          Secure checkout
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Product ID: {product.id}
      </p>
    </div>
  );
}