'use client'

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types/product";
import type { StaticImageData } from "next/image";
import fallBackImageSrc from '@/public/pexels-yankrukov-5793947.jpg'
import { useState } from "react";
import { addProductToCart, isProductInCart, removeProductFromCart } from "../cart/cart_storage";
import { useCart } from "@/hooks/use_cart";

const getImageSrc = (image?: string): string | StaticImageData => {
  if (!image) return fallBackImageSrc;

  try {
    new URL(image);
    return image;
  } catch {
    return fallBackImageSrc;
  }
};

export default function ProductCard({ product }: { product: Product }) {
  console.log("IMAGE:", product.images?.[0]);
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(
    getImageSrc(product.images?.[0])
  );

  const { cartIds } = useCart();
  
  const isProdInCart = cartIds.includes(String(product.id));

  return (
    <div className="shrink-0 w-[280px] rounded-lg border bg-card text-card-foreground flex flex-col overflow-hidden shadow-sm">
      {/* Image section */}
      <Link href={`./products/${product.id}`} className="relative w-full h-[260px]">
        <Image
          src={imgSrc}
          loading="eager"
          alt={product.title || "Product image"}
          fill
          className="object-cover rounded-b-2xl"
          onError={() => setImgSrc(fallBackImageSrc)}
        />
      </Link>

      {/* Info section */}
      <div className="flex flex-col gap-2 w-full flex-1 bg-card p-4 justify-between ">
        <Link href={`./products/${product.id}`} className="text-lg font-bold text-card-foreground">
          {product?.title ? product.title : "missing product title"}
        </Link>

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
            onClick={isProdInCart?()=>removeProductFromCart(String(product.id)):()=>addProductToCart(String(product.id))}
            type="button"
            className={`flex items-center gap-2 rounded-full ${isProdInCart?'bg-red-900':'bg-primary'} px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity`}
          >
            <ShoppingCart className="h-4 w-4" />
            {
              isProdInCart?
              <p  >Remove From Cart</p>
              :
              <p>Add To Cart</p>
            }
          </button>
        </div>
      </div>
    </div>
  );
}