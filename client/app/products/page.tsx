import ProductCard from "@/components/products/product_card";
import LoadMore from "@/components/products/load_more";
import type { Product } from "@/lib/types/product";
import ProductFilters from "@/components/products/filter";

const LIMIT = 20;

const getProducts = async (offset: number): Promise<Product[]> => {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${LIMIT}`
    );
    if (!response.ok) throw new Error("Failed to fetch products");
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
      {/* product container */}
      <div className="flex-1 justify-center gap-4 flex flex-wrap pb-12 pr-[300px]">
        {initialProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* client component takes over from here, appending more products */}
        <LoadMore initialOffset={LIMIT} />
      </div>

      {/* product filter */}
      <div className="h-[700px] w-[300px] fixed top-[135px] right-12">
        <ProductFilters/>
      </div>
    </>
  );
};

export default ProductPage;