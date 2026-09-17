"use client";

import {  validateUser } from "@/lib/redux/features/auth";
import { toggleIsOpenCart } from "@/lib/redux/features/cart";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";


type CartSummaryProps = {
  subtotal: number;
  itemCount: number;
};

export default function CartSummary({
  subtotal,
  itemCount,
}: CartSummaryProps) {

  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const handleMoveToCheckout = ()=>{
    router.push("/checkout")
    dispatch(toggleIsOpenCart());
  }

  const handleCheckoutStart = async () => {
    try {
      await dispatch(validateUser()).unwrap();
      handleMoveToCheckout()
      // router.push("/checkout");
    } catch {
      router.push("/auth/login");
    }
  };

  return (
    <div className="border-t bg-background p-4 sm:p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          Items
        </span>

        <span className="text-sm">
          {itemCount}
        </span>
      </div>

      <div className="flex items-center justify-between mb-5">
        <span className="text-base font-medium">
          Subtotal
        </span>

        <span className="text-base font-semibold">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      <button
        onClick={()=>handleCheckoutStart()}
        type="button"
        disabled={itemCount === 0}
        className="
          w-full
          rounded-md
          bg-foreground
          text-background
          py-2.5
          sm:py-3
          text-sm
          font-medium
          transition
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Checkout
      </button>
    </div>
  );
}