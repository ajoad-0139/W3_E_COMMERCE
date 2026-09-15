import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="shrink-0 w-[280px] rounded-lg border bg-card text-card-foreground flex flex-col overflow-hidden shadow-sm">
      {/* Image section */}
      <div className="relative w-full h-[260px]">
        <Image
          src={product.images?.length ? product.images[0] : ""}
          loading="eager"
          alt={product?.title || "product image"}
          fill
          className="object-cover rounded-b-2xl"
        />
      </div>

      {/* Info section */}
      <div className="flex flex-col gap-2 w-full flex-1 bg-card p-4 justify-between ">
        <h3 className="text-lg font-bold text-card-foreground">
          {product?.title ? product.title : "missing product title"}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product?.description
            ? product.description
            : "missing product description"}
        </p>

        <div className="flex items-center justify-between pt-2 ">
          <span className="text-xl font-bold text-card-foreground">
            {product?.price ? `$${product.price}` : "--"}
          </span>

          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="h-4 w-4" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}