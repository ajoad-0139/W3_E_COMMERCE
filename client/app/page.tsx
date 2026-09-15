import Category from "@/components/home/category";
import Featured from "@/components/home/featured";
import Hero from "@/components/home/hero";

export default function Home() {
  
  return (
    <main className="min-h-screen bg-background p-8 flex items-center justify-center pt-[124px] ">
      <div className="w-[85%] flex flex-col gap-2"> 
        {/* hero section */}
        <Hero/>
        {/* featured product section */}
        <Featured/>
        {/* category section  */}
        <Category/>
      </div>
    </main>
  );
}
