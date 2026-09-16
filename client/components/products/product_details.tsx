import ProductImageSlider from "./product_details_image_slider";
import ProductInfo from "./product_info";
import RelatedProducts from "./related_products";
import { getRatingSummary } from "@/public/mock_review_data";
import type { Product } from "@/lib/types/product";

interface ProductDetailsProps {
  product: Product;
}

// This stays a server component: it just lays out client islands
// (slider, info) and server-rendered related products. No "use client" needed.
export default function ProductDetails({ product }: ProductDetailsProps) {
  const ratingSummary = getRatingSummary();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8  ml-[-0px] ">
      <div className="lg:flex lg:items-start lg:gap-10">
        {/* Left: images — sticky on desktop, scrolls with the page on mobile */}
        <div className="lg:sticky lg:top-8 lg:w-[45%] lg:shrink-0">
          <ProductImageSlider images={product.images} title={product.title} />
        </div>

        {/* Right: details + related products — its own scroll region on desktop */}
        <div className="mt-8 min-w-0 flex-1 space-y-6 lg:mt-0 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:pr-2 scrollbar-hide">
          <ProductInfo product={product} ratingSummary={ratingSummary} />
          <RelatedProducts
            categoryId={product.category.id}
            currentProductId={product.id}
            categoryName={product.category.name}
          />
        </div>
      </div>
    </div>
  );
}