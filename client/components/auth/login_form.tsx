"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import AuthField from "./auth_field";
import { AUTH_ACCENT, AUTH_ACCENT_HOVER } from "@/app/auth/layout";
import { useAppDispatch } from "@/lib/redux/hooks";
import { loginUser } from "@/lib/redux/features/auth";

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginFormProps {
  /** Called with the validated values. Throw to show a form-level error. */
  onSubmit?: (values: LoginFormValues) => Promise<void> | void;
}

type FieldErrors = Partial<Record<"email" | "password", string>>;

function validate(values: LoginFormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Enter your password.";
  }

  return errors;
}

const EMPTY_VALUES: LoginFormValues = { email: "", password: "", remember: false };

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const dispatch = useAppDispatch();
  const [values, setValues] = useState<LoginFormValues>(EMPTY_VALUES);
  const [touched, setTouched] = useState<Partial<Record<"email" | "password", boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const errors = validate(values);

  function handleChange(field: keyof LoginFormValues) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = field === "remember" ? e.target.checked : e.target.value;
      setValues((v) => ({ ...v, [field]: val }));
    };
  }

  function handleBlur(field: "email" | "password") {
    return () => setTouched((t) => ({ ...t, [field]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setFormError("");

    if (Object.keys(errors).length > 0) return;

    try {
      setSubmitting(true);
      await dispatch(loginUser(values))
    //   if (onSubmit) await onSubmit(values);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Couldn't sign you in. Check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError && (
        <div
          role="alert"
          className="rounded-md border px-3.5 py-2.5 text-sm"
          style={{ borderColor: "#F1C6C0", backgroundColor: "#FCF2F1", color: "#9A3226" }}
        >
          {formError}
        </div>
      )}

      <AuthField
        id="email"
        label="Email address"
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={handleChange("email")}
        onBlur={handleBlur("email")}
        error={touched.email && errors.email}
        placeholder="you@company.com"
      />

      <AuthField
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        value={values.password}
        onChange={handleChange("password")}
        onBlur={handleBlur("password")}
        error={touched.password && errors.password}
        placeholder="Enter your password"
        labelExtra={
          <a href="/forgot-password" className="text-xs font-medium underline underline-offset-2" style={{ color: AUTH_ACCENT }}>
            Forgot it?
          </a>
        }
        trailing={
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={values.remember}
          onChange={handleChange("remember")}
          className="h-4 w-4 rounded border-gray-300 accent-current"
          style={{ color: AUTH_ACCENT }}
        />
        Keep me signed in
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-60"
        style={{ backgroundColor: AUTH_ACCENT }}
        onMouseEnter={(e) => !submitting && (e.currentTarget.style.backgroundColor = AUTH_ACCENT_HOVER)}
        onMouseLeave={(e) => !submitting && (e.currentTarget.style.backgroundColor = AUTH_ACCENT)}
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitting ? "Signing in" : "Sign in"}
      </button>
    </form>
  );
}