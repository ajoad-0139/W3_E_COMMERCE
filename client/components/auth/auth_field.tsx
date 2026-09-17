import type { InputHTMLAttributes, ReactNode } from "react";
import { AUTH_INK } from "@/app/auth/_shell";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  /** Validation message; falsy hides the error state */
  error?: string | false;
  /** e.g. a show/hide password button, rendered inside the input on the right */
  trailing?: ReactNode;
  /** e.g. a "Forgot it?" link, rendered next to the label */
  labelExtra?: ReactNode;
}

/**
 * AuthField
 * -------------------------------------------------------------
 * Labeled text input with the shared error/focus styling used
 * across the auth forms. Any native <input> prop can be passed
 * through (type, value, onChange, autoComplete, placeholder...).
 * -------------------------------------------------------------
 */
export default function AuthField({
  id,
  label,
  error,
  trailing,
  labelExtra,
  ...inputProps
}: AuthFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-medium" style={{ color: AUTH_INK }}>
          {label}
        </label>
        {labelExtra}
      </div>
      <div className="relative mt-1.5">
        <input
          id={id}
          name={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full rounded-md border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2"
          style={
            {
              borderColor: error ? "#D9968E" : "#E3E6EA",
              "--tw-ring-color": error ? "#F1C6C0" : "#BFE0D2",
            } as React.CSSProperties
          }
          {...inputProps}
        />
        {trailing && <div className="absolute inset-y-0 right-3 flex items-center">{trailing}</div>}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs" style={{ color: "#C0392B" }}>
          {error}
        </p>
      )}
    </div>
  );
}