
import Image from "next/image";
import type { Product } from "@/lib/types/product";

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

const Hero = async() => {
  
    const products = await getHeroProduct();
  
  
    return (
    <div className="w-full h-[650px] flex gap-2">
        {
            products?.length?
                products.map((product)=><div key={product.id} className="flex-1 h-full relative ">
                    <Image src={product.images?.length?product.images[0]:""} loading="eager" alt="hero product image" width={1600} height={1600} className="w-full h-full object-cover rounded-md"/>
                    <div className="absolute inset-0 bg-black/10 rounded-md flex items-end justify-start p-4 pb-8 hover:pl-12 transition-all duration-300 ease-in-out">
                        <div className="flex flex-col items-start justify-start">
                            <p className="text-xl font-bold text-white">{product?.title?product.title:"missing product title"}</p>
                            <h1 className="max-w-[60%] h-[30px] overflow-hidden text-2xl font-bold text-white">{product?.description?product.description:"missing product description"}</h1>
                        </div>
                    </div>
                </div>) 
            :null
        }
    </div>
  )
}

export default Hero 