"use client";

import { useState } from "react";


import type{ CheckoutFormErrors, CheckoutFormValues, } from "./checkout_form_validation";
import { validateField,
  validateCheckoutForm,
  isFormValid,
  formatCardNumber,
  formatExpiry,
  formatCvc, } from "./checkout_form_validation";
import { processMockPayment } from "./mock_payment";

export type OrderResult = {
  status: "success" | "error";
  transactionId?: string;
  message?: string;
}

interface CheckoutFormProps {
  onComplete: (result: OrderResult) => void;
}

const INITIAL_VALUES: CheckoutFormValues = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

// Total should match whatever is shown in the order summary. In a real app,
// pass this in as a prop or read it from shared cart state.
const ORDER_TOTAL = 194.19;

export default function CheckoutForm({ onComplete }: CheckoutFormProps) {
  const [values, setValues] = useState<CheckoutFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutFormValues, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function updateField(field: keyof CheckoutFormValues, rawValue: string) {
    let value = rawValue;
    if (field === "cardNumber") value = formatCardNumber(rawValue);
    if (field === "expiry") value = formatExpiry(rawValue);
    if (field === "cvc") value = formatCvc(rawValue);

    setValues((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  }

  function handleBlur(field: keyof CheckoutFormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validateCheckoutForm(values);
    setErrors(validationErrors);
    setTouched(
      Object.fromEntries(Object.keys(values).map((key) => [key, true])) as Record<
        keyof CheckoutFormValues,
        boolean
      >
    );

    if (!isFormValid(validationErrors)) return;

    setIsSubmitting(true);
    try {
      const result = await processMockPayment(values, ORDER_TOTAL);
      if (result.status === "success") {
        onComplete({ status: "success", transactionId: result.transactionId });
      } else {
        setSubmitError(result.message);
      }
    } catch {
      setSubmitError("Something went wrong processing your payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Shipping details */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-card-foreground">Shipping details</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Full name"
            field="fullName"
            values={values}
            errors={errors}
            touched={touched}
            onChange={updateField}
            onBlur={handleBlur}
            autoComplete="name"
            className="sm:col-span-2"
          />
          <Field
            label="Email"
            field="email"
            type="email"
            values={values}
            errors={errors}
            touched={touched}
            onChange={updateField}
            onBlur={handleBlur}
            autoComplete="email"
            className="sm:col-span-2"
          />
          <Field
            label="Street address"
            field="address"
            values={values}
            errors={errors}
            touched={touched}
            onChange={updateField}
            onBlur={handleBlur}
            autoComplete="street-address"
            className="sm:col-span-2"
          />
          <Field
            label="City"
            field="city"
            values={values}
            errors={errors}
            touched={touched}
            onChange={updateField}
            onBlur={handleBlur}
            autoComplete="address-level2"
          />
          <Field
            label="Postal code"
            field="postalCode"
            values={values}
            errors={errors}
            touched={touched}
            onChange={updateField}
            onBlur={handleBlur}
            autoComplete="postal-code"
          />
          <Field
            label="Country"
            field="country"
            values={values}
            errors={errors}
            touched={touched}
            onChange={updateField}
            onBlur={handleBlur}
            autoComplete="country-name"
            className="sm:col-span-2"
          />
        </div>
      </section>

      {/* Payment details */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-card-foreground">Payment details</h2>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Mock payment — no charge occurs
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Name on card"
            field="cardName"
            values={values}
            errors={errors}
            touched={touched}
            onChange={updateField}
            onBlur={handleBlur}
            autoComplete="cc-name"
            className="sm:col-span-2"
          />
          <Field
            label="Card number"
            field="cardNumber"
            values={values}
            errors={errors}
            touched={touched}
            onChange={updateField}
            onBlur={handleBlur}
            placeholder="4242 4242 4242 4242"
            inputMode="numeric"
            autoComplete="cc-number"
            className="sm:col-span-2"
          />
          <Field
            label="Expiry (MM/YY)"
            field="expiry"
            values={values}
            errors={errors}
            touched={touched}
            onChange={updateField}
            onBlur={handleBlur}
            placeholder="MM/YY"
            inputMode="numeric"
            autoComplete="cc-exp"
          />
          <Field
            label="CVC"
            field="cvc"
            values={values}
            errors={errors}
            touched={touched}
            onChange={updateField}
            onBlur={handleBlur}
            placeholder="123"
            inputMode="numeric"
            autoComplete="cc-csc"
          />
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Tip: any card number works in this demo — end it in "0000" to simulate a decline.
        </p>
      </section>

      {submitError && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.502-3.032-1.502-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <span>{submitError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Processing payment…
          </>
        ) : (
          `Pay now`
        )}
      </button>
    </form>
  );
}

// --- Reusable field component ---

interface FieldProps {
  label: string;
  field: keyof CheckoutFormValues;
  values: CheckoutFormValues;
  errors: CheckoutFormErrors;
  touched: Partial<Record<keyof CheckoutFormValues, boolean>>;
  onChange: (field: keyof CheckoutFormValues, value: string) => void;
  onBlur: (field: keyof CheckoutFormValues) => void;
  type?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  className?: string;
}

function Field({
  label,
  field,
  values,
  errors,
  touched,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  inputMode,
  autoComplete,
  className = "",
}: FieldProps) {
  const error = touched[field] ? errors[field] : undefined;

  return (
    <div className={className}>
      <label htmlFor={field} className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <input
        id={field}
        name={field}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={values[field]}
        onChange={(e) => onChange(field, e.target.value)}
        onBlur={() => onBlur(field)}
        aria-invalid={!!error}
        aria-describedby={error ? `${field}-error` : undefined}
        className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          error
            ? "border-destructive focus:ring-destructive"
            : "border-input focus:ring-ring"
        }`}
      />
      {error && (
        <p id={`${field}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}