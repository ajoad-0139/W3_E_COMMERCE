import ProductList from "@/components/products/product_list";
import ProductInitializer from "@/components/products/product_initializer";
import LoadMore from "@/components/products/load_more";
import FilterPanel from "@/components/products/filter_panel";

import type { Product } from "@/lib/types/product";

const LIMIT = 20;

const getProducts = async (
  offset: number
): Promise<Product[]> => {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${LIMIT}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

const ProductPage = async () => {
  const initialProducts = await getProducts(0);

  return (
    <>
      {/* Put initial server products into Redux */}
      <ProductInitializer products={initialProducts} />

      {/* product container */}
      <div className="flex-1 justify-center gap-4 flex flex-wrap px-4 sm:px-8 lg:px-0 pb-24 lg:pb-12 lg:pr-[300px]">
        <ProductList />

        {/* client component takes over from here */}
        <LoadMore initialOffset={LIMIT} />
      </div>

      {/* product filter: fixed sidebar on desktop, toggle+drawer on mobile/tablet */}
      <FilterPanel />
    </>
  );
};

export default ProductPage;