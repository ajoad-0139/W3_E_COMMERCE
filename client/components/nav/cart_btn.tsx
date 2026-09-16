"use client";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/redux/store";
import { toggleIsOpenCart } from "@/lib/redux/features/cart";

const CartButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleIsOpenCart())}
      className="border-none cursor-pointer flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shopping-cart "
      >
        <path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" />
        <path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" />
        <circle cx="18" cy="20" r="2" />
        <circle cx="8" cy="20" r="2" />
      </svg>
    </button>
  );
};

export default CartButton;