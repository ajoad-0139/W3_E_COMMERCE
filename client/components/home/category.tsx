import type { Category } from "@/lib/types/product";
import CategoryCard from "./category_card";
const getCetegories = async () =>{
    try {
        const response = await fetch("https://api.escuelajs.co/api/v1/categories")
        const categories = await response.json();
        console.log(categories, "categories")
        return categories;
    } catch (error) {

        console.error("Failed to fetch hero categories:", error);
        throw error;
    }
}

const Category = async() => {
    const categories = await getCetegories();
  return (
    <section className="w-full h-[700px] bg-[#1a7e3b] mt-12 rounded-xl flex items-center justify-center">
        <div className="flex-3 flex items-center justify-end ">
            <div className="h-[610px] w-[610px] grid grid-cols-2 gap-2 overflow-hidden">
                {
                    categories?.length?
                        categories.map((category: Category, index: number) =>
                            <CategoryCard key={category.id} category={category}/>
                        )
                    :null
                }
            </div>
        </div>
        <div className="flex-2 min-w-0 text-white h-full flex pl-[10%] flex-col items-start justify-center">
            <h1 className="text-3xl font-bold">Product Categories</h1>
            <p className="max-w-[60%]">Take a look at some inspiring tips and ideas to make play, study and work spaces really work for everyone in the family – big or small!</p>
        </div>
    </section>
  )
}

export default Category