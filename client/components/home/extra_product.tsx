import Image from "next/image";
import type { Product } from "@/lib/types/product";

const getProduct = async (): Promise<Product[]> => {
  try {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/products?offset=6&limit=3"
    );

    return response.json();
  } catch (error) {
    console.error("Failed to fetch hero products:", error);
    throw error;
  }
};

const ProductFrame = async () => {
  const products = await getProduct();

  return (
    <div className="mt-12 flex h-auto w-full flex-col gap-4 sm:flex-row sm:gap-3 lg:h-[600px]">
      {products?.length
        ? products.map((product) => (
            <div
              key={product.id}
              className="group flex h-[320px] w-full min-w-0 flex-col sm:h-[400px] sm:flex-1 lg:h-full"
            >
              <div className="min-h-0 w-full flex-1">
                <Image
                  src={product.images?.[0] || ""}
                  loading="eager"
                  alt="hero product image"
                  width={1600}
                  height={1600}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>

              <div className="h-[100px] w-full sm:h-[120px]">
                <div className="flex flex-col items-start justify-center pt-3 transition-all duration-300 ease-in-out group-hover:pl-6 lg:group-hover:pl-12">
                  <p className="text-base sm:text-lg">
                    {product.title || "missing product title"}
                  </p>

                  <h1 className="h-[30px] max-w-[85%] overflow-hidden text-lg font-bold sm:max-w-[75%] sm:text-xl lg:max-w-[60%]">
                    {product.description || "missing product description"}
                  </h1>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default ProductFrame;