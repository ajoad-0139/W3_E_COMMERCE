"use client";

import { LogOut } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/features/auth";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="
        flex items-center justify-center gap-2
        rounded-lg
        px-3 py-2
        text-sm font-semibold
        text-secondary-foreground
        transition-colors
        hover:bg-destructive/10
        hover:text-destructive
      "
    >
      <LogOut size={22} />
      {/* <span>Logout</span> */}
    </button>
  );
};

export default LogoutButton;