import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "@/lib/types/product";

type CartState = {
  isOpenCart: boolean;
  products: Product[];
};

const initialState: CartState = {
  isOpenCart: false,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    toggleIsOpenCart: (state) => {
      state.isOpenCart = !state.isOpenCart;
    },

    setCartProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    clearCartProducts: (state) => {
      state.products = [];
    },
  },
});

export default cartSlice.reducer;

export const {
  toggleIsOpenCart,
  setCartProducts,
  clearCartProducts,
} = cartSlice.actions;

export const currentIsOpenCart = (state: RootState) =>
  state.cart.isOpenCart;

export const currentCartProducts = (state: RootState) =>
  state.cart.products;