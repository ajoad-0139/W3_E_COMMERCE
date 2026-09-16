import Link from "next/link";
import type { Product } from "@/lib/types/product";

interface RelatedProductCardProps {
  product: Product;
}

export default function RelatedProductCard({ product }: RelatedProductCardProps) {
  const image = product.images[0];

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-muted-foreground/40"
    >
      <div className="aspect-square w-full overflow-hidden bg-muted">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-medium text-foreground">{product.title}</p>
        <p className="mt-1 text-sm font-semibold text-foreground">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}