import Image from "next/image";
import type { Product } from "@/lib/types/product";
import fallbackImgSrc from '../../public/pexels-yankrukov-5793947.jpg'

const getHeroProduct = async(): Promise<Product[]> =>{
    try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products?offset=4&limit=2")
        const products = await response.json();
        console.log(products)
        return products;
    } catch (error) {
        console.error("Failed to fetch hero products:", error);
        throw error;
    }
}

const getValidImage = (product: Product) => {
    const src = product.images?.[0];
    if (typeof src === "string" && /^https?:\/\/.+/.test(src)) {
        return src;
    }
    return fallbackImgSrc;
}

const Hero = async() => {
    const products = await getHeroProduct();

    return (
        <div className="w-full h-auto min-h-[500px] lg:h-[650px] flex flex-col lg:flex-row gap-2">
            {
                products?.length?
                    products.map((product)=>
                        <div key={product.id} className="flex-1 h-[350px] sm:h-[450px] lg:h-full relative">
                            <Image
                                src={getValidImage(product)}
                                loading="eager"
                                alt="hero product image"
                                width={1600}
                                height={1600}
                                className="w-full h-full object-cover rounded-md"
                            />
                            <div className="absolute inset-0 bg-black/10 rounded-md flex items-end justify-start p-4 pb-6 sm:pb-8 hover:pl-6 lg:hover:pl-12 transition-all duration-300 ease-in-out">
                                <div className="flex flex-col items-start justify-start">
                                    <p className="text-base sm:text-lg lg:text-xl font-bold text-white">
                                        {product?.title?product.title:"missing product title"}
                                    </p>
                                    <h1 className="max-w-[85%] sm:max-w-[70%] lg:max-w-[60%] h-auto max-h-[50px] sm:max-h-[60px] overflow-hidden text-lg sm:text-xl lg:text-2xl font-bold text-white">
                                        {product?.description?product.description:"missing product description"}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    )
                :null
            }
        </div>
    )
}

export default Hero