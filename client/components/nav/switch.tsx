"use client";

import { Moon, Sun } from "lucide-react";

import { toggleTheme } from "@/lib/redux/features/theme";
import {
  useAppDispatch,
  useAppSelector,
} from "@/lib/redux/hooks";

const SwitchComponent = () => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(
    (state) => state.theme.theme
  );

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className="
        flex h-10 w-10
        items-center justify-center
        rounded-full
        bg-secondary
        text-secondary-foreground
        transition-colors
        hover:bg-muted
      "
      aria-label={`Switch to ${
        isDark ? "light" : "dark"
      } mode`}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
};

export default SwitchComponent;