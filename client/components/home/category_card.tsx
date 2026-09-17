'use client'
import Image from "next/image"
import { useState } from "react"
import type { Category } from "@/lib/types/product"
import fallbackImgSrc from '../../public/pexels-yankrukov-5793947.jpg'
import { StaticImageData } from "next/image"

const CategoryCard = ({category}:{category:Category}) => {
    const [imgSrc, setImgSrc] = useState<string | StaticImageData>(category.image)
  return (
    <div key={category.id} className="w-full h-full aspect-square lg:w-[300px] lg:h-[300px] relative">
        <Image
            src={imgSrc}
            loading="eager"
            alt="hero product image"
            width={800}
            height={800}
            className="w-full h-full object-cover rounded-md"
            preload={true}
            onError={()=>{setImgSrc(fallbackImgSrc)}}
        />
        <div className="absolute inset-0 bg-black/5 rounded-md flex items-end justify-start p-3 sm:p-4 lg:p-6">
            <p className="text-sm sm:text-base lg:text-lg text-secondary-foreground font-semibold">{category?.name?category.name:'missing category name'}</p>
        </div>
    </div>
  )
}

export default CategoryCard