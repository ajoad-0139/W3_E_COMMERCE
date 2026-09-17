"use client";

import { useMemo, useState } from "react";
import CheckoutForm from "@/components/checkout/checkout_form";
import type { OrderResult } from "@/components/checkout/checkout_form";
import { useAppSelector } from "@/lib/redux/hooks";
import { currentCartProducts } from "@/lib/redux/features/cart";
import Image from "next/image";
import { useRouter } from "next/navigation";



const SHIPPING_FLAT_RATE = 6.99;
const TAX_RATE = 0.08;

export default function CheckoutPage() {
  const [result, setResult] = useState<OrderResult | null>(null);
  const CART_ITEMS = useAppSelector(currentCartProducts);
  const subtotal = useMemo(
    () => CART_ITEMS.reduce((sum, item) => sum + item.price, 0),
    []
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING_FLAT_RATE + tax;

  const router = useRouter()
  const handleGoToStore = ()=>{
    router.push('/products')
  }

  if (result?.status === "success") {
    
    return (
      <main className="min-h-full flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
            <svg
              className="h-7 w-7 text-success"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-card-foreground">Payment successful</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Confirmation #{result.transactionId} — a receipt has been sent to your email.
          </p>
          <p className="mt-4 text-2xl font-semibold text-card-foreground">
            ${total.toFixed(2)}
          </p>
          <button
            onClick={() => handleGoToStore()}
            className="mt-6 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Back to store
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Checkout</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete your purchase securely below.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <CheckoutForm onComplete={setResult} />
          </div>

          {/* Order summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-card-foreground">Order summary</h2>

              <ul className="mt-4 space-y-3">
                {CART_ITEMS.map((product) => (
                  <div key={product.id} className="flex gap-4 py-4 border-b">
                        {/* Image */}
                        <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-md bg-muted">
                          <Image
                            src={product.images?.[0] ?? "/placeholder.png"}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                  
                        {/* Content */}
                        <div className="flex flex-1 flex-col justify-between min-w-0">
                          <div>
                            <h3 className="text-sm font-medium truncate">
                              {product.title}
                            </h3>
                  
                            <p className="text-xs text-muted-foreground mt-1">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                  
                        {/* Price */}
                        <div className="text-sm font-medium shrink-0">
                          ${product.price}
                        </div>
                      </div>
                ))}
              </ul>

              <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>${SHIPPING_FLAT_RATE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between border-t border-border pt-4">
                <span className="text-base font-semibold text-card-foreground">Total</span>
                <span className="text-base font-semibold text-card-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-xs text-accent-foreground">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span>Check carefully before proced to payment </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}