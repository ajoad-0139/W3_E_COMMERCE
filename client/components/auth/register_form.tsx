    "use client";

    import { useState } from "react";
    import { Eye, EyeOff, Loader2, Check } from "lucide-react";
    import AuthField from "./auth_field";
    import { AUTH_ACCENT_HOVER, AUTH_ACCENT, AUTH_INK } from "@/app/auth/layout";
import { useAppDispatch } from "@/lib/redux/hooks";
import { createUser } from "@/lib/redux/features/auth";

    export interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    }

    interface RegisterFormProps {
    /** Called with the validated values. Throw to show a form-level error. */
    onSubmit?: (values: RegisterFormValues) => Promise<void> | void;
    }

    type FieldErrors = Partial<Record<keyof RegisterFormValues, string>>;

    function validate(values: RegisterFormValues): FieldErrors {
    const errors: FieldErrors = {};

    if (!values.name.trim()) {
        errors.name = "Enter your full name.";
    }

    if (!values.email.trim()) {
        errors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Enter a valid email address.";
    }

    if (!values.password) {
        errors.password = "Create a password.";
    } else if (values.password.length < 8) {
        errors.password = "Use at least 8 characters.";
    }

    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords don't match.";
    }

    return errors;
    }

    function passwordStrength(password: string): number {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return Math.min(score, 4);
    }

    const STRENGTH_LABEL = ["Weak", "Fair", "Good", "Strong"];
    const STRENGTH_COLOR: Record<number, string> = {
    0: "#E5E7EB",
    1: "#C0392B",
    2: "#D68910",
    3: "#D68910",
    4: AUTH_ACCENT,
    };

    const EMPTY_VALUES: RegisterFormValues = { name: "", email: "", password: "" };

    export default function RegisterForm({ onSubmit }: RegisterFormProps) {
        const dispatch = useAppDispatch()
    const [values, setValues] = useState<RegisterFormValues>(EMPTY_VALUES);
    const [touched, setTouched] = useState<Partial<Record<keyof RegisterFormValues, boolean>>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [success, setSuccess] = useState(false);

    const errors = validate(values);
    const strength = passwordStrength(values.password);

    function handleChange(field: keyof RegisterFormValues) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((v) => ({ ...v, [field]: e.target.value }));
        };
    }

    function handleBlur(field: keyof RegisterFormValues) {
        return () => setTouched((t) => ({ ...t, [field]: true }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setTouched({ name: true, email: true, password: true, confirmPassword: true });
        setFormError("");

        if (Object.keys(errors).length > 0) return;

        try {
        setSubmitting(true);
        // if (onSubmit) await onSubmit(values);
        await dispatch(createUser(values))
        setSuccess(true);
        } catch (err) {
        setFormError(err instanceof Error ? err.message : "Something went wrong. Try again.");
        } finally {
        setSubmitting(false);
        }
    }

    if (success) {
        return (
        <div className="text-left">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF3EF]">
            <Check className="h-5 w-5" style={{ color: AUTH_ACCENT }} strokeWidth={2.5} />
            </div>
            <p className="text-sm font-medium" style={{ color: AUTH_INK }}>
            Account created
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
            We sent a confirmation link to {values.email}. Verify your address to finish setting up your account.
            </p>
        </div>
        );
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
            id="name"
            label="Full name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            error={touched.name && errors.name}
            placeholder="Jordan Reyes"
        />

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

        <div>
            <AuthField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            error={touched.password && errors.password}
            placeholder="At least 8 characters"
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

            {values.password && (
            <div className="mt-2">
                <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                    <span
                    key={i}
                    className="h-1 flex-1 rounded-full transition-colors"
                    style={{ backgroundColor: i < strength ? STRENGTH_COLOR[strength] : "#E5E7EB" }}
                    />
                ))}
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                {STRENGTH_LABEL[Math.max(strength - 1, 0)]} password
                </p>
            </div>
            )}
        </div>

        <AuthField
            id="confirmPassword"
            label="Confirm password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            error={touched.confirmPassword && errors.confirmPassword}
            placeholder="Re-enter your password"
        />

        <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-60"
            style={{ backgroundColor: AUTH_ACCENT }}
            onMouseEnter={(e) => !submitting && (e.currentTarget.style.backgroundColor = AUTH_ACCENT_HOVER)}
            onMouseLeave={(e) => !submitting && (e.currentTarget.style.backgroundColor = AUTH_ACCENT)}
        >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Creating account" : "Create account"}
        </button>

        <p className="text-xs leading-relaxed text-gray-400">
            By creating an account you agree to our{" "}
            <a href="/terms" className="underline underline-offset-2 hover:text-gray-600">
            Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-gray-600">
            Privacy Policy
            </a>
            .
        </p>
        </form>
    );
    }