import Link from "next/link"
import SwitchComponent from "./switch"
import CartButton from "./cart_btn"
import { Handbag } from "lucide-react"
import LogoutButton from "./logout"

const Nav = () => {

  return (
    <nav className="fixed top-0 left-0 right-0 h-[100px] sm:h-[124px] flex items-center justify-center z-10 ">
        <div className={`w-[92%] sm:w-[85%] lg:w-[60%] h-[60px] bg-foreground/10 backdrop-blur-xl flex items-center justify-between px-4 sm:px-8 lg:px-12 rounded-2xl`}>
        <div className="flex items-center justify-center gap-2 sm:gap-4">
            <Link href={"/"} className="flex items-center justify-center gap-2">
                <div className="p-[2px] bg-primary rounded-full">
                    <div className="rounded-full h-[28px] w-[28px] flex items-center justify-center bg-transparent">
                        <Handbag className="text-white" size={18}/>
                    </div>
                </div>
                <p className="hidden lg:block text-primary font-bold font-sans">W3 E-COMMERCE</p>
            </Link>
            <Link href={"/products"} className="text-secondary-foreground text-sm sm:text-md font-semibold hover:text-accent-foreground">Products</Link>
            <Link href={"/#category-section"} className="hidden lg:block text-secondary-foreground text-md font-semibold hover:text-accent-foreground">Categories</Link>
            <Link href={"/#featured-section"} className="hidden lg:block text-secondary-foreground text-md font-semibold hover:text-accent-foreground">Featured</Link>
        </div>
        <div className="flex items-center justify-center gap-2 sm:gap-4">
            {/* <input type="text" placeholder="Search products..." className="h-8 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20" /> */}
            <SwitchComponent/>
            <CartButton/>
            <LogoutButton/>
        </div>
        
        </div>
    </nav>
  )
}

export default Nav