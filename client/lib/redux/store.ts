import { configureStore } from "@reduxjs/toolkit";
import utilsReducer from "./features/utils";
import cartReducer from "./features/cart";
import authReducer from "./features/auth";

export const makeStore = () => {
  return configureStore({
    reducer: {
        utils:utilsReducer,
        cart:cartReducer,
        auth:authReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];