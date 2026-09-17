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
    removeCartProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => String(product.id) !== action.payload
      );
    },
  },
});

export default cartSlice.reducer;

export const {
  toggleIsOpenCart,
  setCartProducts,
  clearCartProducts,
  removeCartProduct
} = cartSlice.actions;

export const currentIsOpenCart = (state: RootState) =>
  state.cart.isOpenCart;

export const currentCartProducts = (state: RootState) =>
  state.cart.products;