"use client";

import Image from "next/image";
import { Product } from "@/lib/types/product";
import { removeProductFromCart } from "./cart_storage";

type CartItemProps = {
  product: Product;
};

export default function CartItem({
  product,
}: CartItemProps) {
  const handleRemove = () => {
    removeProductFromCart(String(product.id));
  };

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Image */}
      <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={product.images?.[0] ?? "/placeholder.png"}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          <h3 className="text-sm font-medium truncate">
            {product.title}
          </h3>

          <p className="text-xs text-muted-foreground mt-1">
            ${product.price}
          </p>
        </div>

        <button
          type="button"
          onClick={handleRemove}
          className="self-start text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Remove
        </button>
      </div>

      {/* Price */}
      <div className="text-sm font-medium shrink-0">
        ${product.price}
      </div>
    </div>
  );
}