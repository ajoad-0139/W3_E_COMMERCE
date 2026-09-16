import RelatedProductCard from "./related_product_card";
import { getProductsByCategory } from "@/app/products/[id]/api";

interface RelatedProductsProps {
  categoryId: number;
  currentProductId: number;
  categoryName: string;
}

export default async function RelatedProducts({
  categoryId,
  currentProductId,
  categoryName,
}: RelatedProductsProps) {
  const products = await getProductsByCategory(categoryId, currentProductId, 8);

  if (products.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">More from {categoryName}</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {products.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}