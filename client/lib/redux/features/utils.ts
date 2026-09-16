import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Product, ProductFilter } from "@/lib/types/product";

import { RootState } from "../store";

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest"
  | "oldest";

type StateType = {
  products: Product[];
  productFilter: ProductFilter | null;
  isShowRootModal:boolean
  sort: SortOption
};

const initialState: StateType = {
  products: [],
  productFilter: null,
  isShowRootModal:false,
  sort:"default"
};

const utilSlice = createSlice({
  name: "util",

  initialState,

  reducers: {
    setProduct: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    setProductFilter: (
      state,
      action: PayloadAction<ProductFilter | null>
    ) => {
      state.productFilter = action.payload;
    },
    setSort: (state, action: PayloadAction<SortOption>) => {
        state.sort = action.payload;
    },
  },
});

export const {
  setProduct,
  setProductFilter,
  setSort
} = utilSlice.actions;

export default utilSlice.reducer;

export const currentProducts = (state: RootState) =>  state.utils.products;
export const currentProductsFilter = (state: RootState) =>  state.utils.productFilter;
export const currentIsShowRootModal = (state: RootState) => state.utils.isShowRootModal;
export const currentSort = (state: RootState) => state.utils.sort;