import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const THEME_KEY = "w3_e-commerce_theme";

type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
};

const initialState: ThemeState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",

  initialState,

  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem(THEME_KEY, action.payload);
      }
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";

      if (typeof window !== "undefined") {
        localStorage.setItem(THEME_KEY, state.theme);
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;