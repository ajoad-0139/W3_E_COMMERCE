import Link from "next/link"
import SwitchComponent from "./switch"
import CartButton from "./cart_btn"
import { Handbag } from "lucide-react"

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[124px] flex items-center justify-center z-10 ">
        <div className="w-[60%] h-[60px] bg-black/10 backdrop-blur-xl flex items-center justify-between px-12 rounded-2xl">
        <div className="flex items-center justify-center gap-4">
            <Link href={"/"} className="flex items-center justify-center gap-2">
                <div className="p-[2px] bg-blue-950 rounded-full">
                    <div className="rounded-full h-[28px] w-[28px] flex items-center justify-center bg-background">
                        <Handbag size={18}/>
                    </div>
                </div>
                <p className="text-blue-950 font-bold font-sans">W3 E-COMMERCE</p>
            </Link>
            <Link href={"/products"} className="text-secondary-foreground text-md font-semibold hover:text-accent-foreground">Products</Link>
            <Link href={""} className="text-secondary-foreground text-md font-semibold hover:text-accent-foreground">Categories</Link>
            <Link href={""} className="text-secondary-foreground text-md font-semibold hover:text-accent-foreground">Featured</Link>
        </div>
        <div className="flex items-center justify-center gap-4">
            {/* <input type="text" placeholder="Search products..." className="h-8 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20" /> */}
            <SwitchComponent/>
            <CartButton/>
        </div>
        
        </div>
    </nav>
  )
}

export default Nav