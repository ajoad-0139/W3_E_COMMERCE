"use client";

import { useEffect } from "react";

import {
  setTheme,
  THEME_KEY,
} from "@/lib/redux/features/theme";

import {
  useAppDispatch,
  useAppSelector,
} from "@/lib/redux/hooks";

const ThemeProvider = () => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(
    (state) => state.theme.theme
  );

  // Restore saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  // Apply theme to <html>
  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove("light", "dark");
    html.classList.add(theme);
  }, [theme]);

  return null;
};

export default ThemeProvider;