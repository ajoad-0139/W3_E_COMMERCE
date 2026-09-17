"use client";

import { currentIsLoggedIn } from "@/lib/redux/features/auth";
import AuthShell, { AUTH_ACCENT } from "../_shell";
import RegisterForm from "@/components/auth/register_form";
import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const isLoggedIn = useAppSelector(currentIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) router.push("/checkout");
  }, [isLoggedIn]);

  return (
    <AuthShell
      title="Create an account"
      subtitle={
        <>
          Already have an account?{" "}
          <a href="/auth/login" className="font-medium underline underline-offset-2" style={{ color: AUTH_ACCENT }}>
            Sign in
          </a>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}