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
    <section id="category-section" className="w-full h-auto lg:h-[700px] bg-[#1a7e3b] mt-4 rounded-xl flex flex-col-reverse lg:flex-row items-center justify-center py-8 lg:py-0 px-4 lg:px-0 gap-6 lg:gap-0">
        <div className="w-full lg:flex-3 flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[500px] h-auto aspect-square sm:max-w-[610px] lg:w-[610px] lg:h-[610px] grid grid-cols-2 gap-2 overflow-hidden">
                {
                    categories?.length?
                        categories.map((category: Category, index: number) =>
                            <CategoryCard key={category.id} category={category}/>
                        )
                    :null
                }
            </div>
        </div>
        <div className="w-full lg:flex-2 min-w-0 text-white h-auto lg:h-full flex px-4 sm:px-8 lg:pl-[10%] lg:pr-0 flex-col items-start justify-center text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold mx-auto lg:mx-0">Product Categories</h1>
            <p className="max-w-full sm:max-w-[80%] lg:max-w-[60%] mt-2 lg:mt-0 mx-auto lg:mx-0">Take a look at some inspiring tips and ideas to make play, study and work spaces really work for everyone in the family – big or small!</p>
        </div>
    </section>
  )
}

export default Category