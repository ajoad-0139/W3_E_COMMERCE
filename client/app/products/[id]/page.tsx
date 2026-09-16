import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/product_details";
import { getProductById } from "./api";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Server component — fetches the product on the server before rendering,
// so no client JS is shipped just to load product data.
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}