"use client";

import { currentIsLoggedIn } from "@/lib/redux/features/auth";
import AuthLayout, {AUTH_ACCENT} from "../layout";
import LoginForm, {type LoginFormValues} from "@/components/auth/login_form";
import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function LoginPage() {
  async function handleLogin(values: LoginFormValues) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error("Invalid email or password.");
  }

  const router = useRouter()
  const isLoggedIn = useAppSelector(currentIsLoggedIn)

  useEffect(()=>{
    if(isLoggedIn) router.push('/checkout')
  },[isLoggedIn])
  return (
    <AuthLayout
      title="Sign in"
      subtitle={
        <>
          New here?{" "}
          <a href="/auth/register" className="font-medium underline underline-offset-2" style={{ color: AUTH_ACCENT }}>
            Create an account
          </a>
        </>
      }
    >
      <LoginForm onSubmit={handleLogin} />
    </AuthLayout>
  );
}