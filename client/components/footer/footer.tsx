import Link from "next/link";
import {
  Handbag,

  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-foreground/5 border-t mt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Brand */}
          <div className="flex flex-col items-start gap-3 sm:col-span-2 lg:col-span-1">
            <Link href={"/"} className="flex items-center gap-2">
              <div className="p-[2px] bg-primary rounded-full">
                <div className="rounded-full h-[28px] w-[28px] flex items-center justify-center bg-transparent">
                  <Handbag className="text-white" size={18} />
                </div>
              </div>
              <p className="text-primary font-bold font-sans">
                W3 E-COMMERCE
              </p>
            </Link>

            <p className="text-sm text-muted-foreground max-w-[320px]">
              Quality products for every room, every family, every budget.
              Shop smarter, live better.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-card border text-secondary-foreground hover:bg-secondary transition-colors"
              >
                <svg style={{"height":"18px", "fill":"blue"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"> <path d="M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z"/></svg>
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-card border text-secondary-foreground hover:bg-secondary transition-colors"
              >
                <svg style={{"height":"18px", "fill":"blue"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-card border text-secondary-foreground hover:bg-secondary transition-colors"
              >
                <svg style={{"height":"18px", "fill":"blue"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M357.2 48L427.8 48 273.6 224.2 455 464 313 464 201.7 318.6 74.5 464 3.8 464 168.7 275.5-5.2 48 140.4 48 240.9 180.9 357.2 48zM332.4 421.8l39.1 0-252.4-333.8-42 0 255.3 333.8z"/></svg>
              </Link>
            </div>
          </div>

          {/* Shop links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-secondary-foreground">
              Shop
            </h3>
            <Link
              href="/products"
              className="text-sm text-muted-foreground hover:text-accent-foreground transition-colors"
            >
              All Products
            </Link>
            <Link
              href="/#category-section"
              className="text-sm text-muted-foreground hover:text-accent-foreground transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/#featured-section"
              className="text-sm text-muted-foreground hover:text-accent-foreground transition-colors"
            >
              Featured
            </Link>
            <Link
              href="/cart"
              className="text-sm text-muted-foreground hover:text-accent-foreground transition-colors"
            >
              Cart
            </Link>
          </div>

          {/* Company links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-secondary-foreground">
              Company
            </h3>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-accent-foreground transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-accent-foreground transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-accent-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-accent-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-secondary-foreground">
              Get in Touch
            </h3>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              <span>123 Market Street, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span>+880 123 456 789</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              <span>support@w3ecommerce.com</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {year} W3 E-COMMERCE. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-accent-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-accent-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/sitemap"
              className="text-xs text-muted-foreground hover:text-accent-foreground transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;