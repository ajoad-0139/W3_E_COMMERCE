"use client";

import AuthLayout, {AUTH_ACCENT} from "../layout";
import RegisterForm, {type RegisterFormValues} from "@/components/auth/register_form";

export default function RegisterPage() {
  async function handleRegister(values: RegisterFormValues) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error("Couldn't create your account. Try again.");
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already have one?{" "}
          <a href="/auth/login" className="font-medium underline underline-offset-2" style={{ color: AUTH_ACCENT }}>
            Sign in
          </a>
        </>
      }
    >
      <RegisterForm onSubmit={handleRegister} />
    </AuthLayout>
  );
}