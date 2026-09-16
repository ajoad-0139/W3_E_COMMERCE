"use client";

import {
  currentIsOpenCart,
  toggleIsOpenCart,
} from "@/lib/redux/features/cart";

import {
  useAppDispatch,
  useAppSelector,
} from "@/lib/redux/hooks";

import CartDrawer from "../cart/cart_drawer";

const RootModal = () => {
  const dispatch = useAppDispatch();

  const isOpenCart = useAppSelector(currentIsOpenCart);

  const closeModal = () => {
    if (isOpenCart) {
      dispatch(toggleIsOpenCart());
    }
  };

  return (
    <div
      onClick={closeModal}
      className={`
        fixed
        inset-0
        z-[100]

        bg-black/40
        backdrop-blur-xl

        transition-opacity
        duration-500

        ${
          isOpenCart
            ? "visible opacity-100"
            : "invisible opacity-0"
        }
      `}
    >
      <CartDrawer />
    </div>
  );
};

export default RootModal;