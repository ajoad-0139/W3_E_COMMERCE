import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types/product";

export default function FeaturedCard({ product }: {product:Product}) {

  return (
    <Link href={`/products/${product.id}`} className="shrink-0 w-[150px] h-[210px] sm:w-[190px] sm:h-[260px] lg:w-[224px] lg:h-[300px] rounded-xl  bg-card  text-card-foreground flex flex-col">
        <div className="flex-4 min-h-0 w-full rounded-t-sm">
            <Image src={product.images?.length?product.images[0]:""} loading="eager" alt="hero product image" width={300} height={800} className="w-full h-full object-cover rounded-t-sm"/>
        </div>
        <div className="flex flex-col items-start justify-center flex-2 min-h-0 w-full bg-white rounded-b-sm p-2">
            <p className="max-w-[60%] h-6 text-xs sm:text-sm text-muted-foreground overflow-hidden ">{product?.description?product.description:"missing product description"}</p>
            <p className="text-black text-xs sm:text-sm max-w-[70%] h-9 sm:h-11 overflow-hidden font-semibold">{product?.title?product.title:"missing product title"}</p>
        </div>
    </Link>
  );
}