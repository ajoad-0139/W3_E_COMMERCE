import Category from "@/components/home/category";
import ProductFrame from "@/components/home/extra_product";
import Featured from "@/components/home/featured";
import Hero from "@/components/home/hero";
import DescriptionSection from "@/components/home/why_us";

export default function Home() {
  
  return (
    <main className="min-h-screen bg-background p-8 flex items-center justify-center pt-[124px] ">
      <div className="w-[85%] flex flex-col gap-2"> 
        {/* hero section */}
        {/* <DescriptionSection/> */}
        <Hero/>
        {/* featured product section */}
        <Featured/>
        {/* category section  */}
        <ProductFrame/>
        <Category/>
        {/* description section */}
      </div>
    </main>
  );
}
