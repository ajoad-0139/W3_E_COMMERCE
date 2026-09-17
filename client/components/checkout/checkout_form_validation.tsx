// Shared validation logic for the checkout form.
// Kept framework-agnostic (no React) so it can be unit-tested in isolation.

export interface CheckoutFormValues {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  cardName: string;
  cardNumber: string; // formatted with spaces, e.g. "4242 4242 4242 4242"
  expiry: string; // "MM/YY"
  cvc: string;
}

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POSTAL_CODE_REGEX = /^[A-Za-z0-9][A-Za-z0-9\s-]{2,9}$/;

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** Luhn checksum — validates card number structure without checking a real issuer. */
function passesLuhnCheck(cardNumber: string): boolean {
  const digits = digitsOnly(cardNumber);
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function isExpiryValid(expiry: string): boolean {
  const match = /^(\d{2})\/(\d{2})$/.exec(expiry.trim());
  if (!match) return false;

  const month = parseInt(match[1], 10);
  const year = 2000 + parseInt(match[2], 10);
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  return true;
}

/** Validates a single field; used for on-blur / on-change inline feedback. */
export function validateField(
  field: keyof CheckoutFormValues,
  value: string
): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "fullName":
      if (!trimmed) return "Full name is required.";
      if (trimmed.length < 2) return "Enter your full name.";
      return undefined;

    case "email":
      if (!trimmed) return "Email is required.";
      if (!EMAIL_REGEX.test(trimmed)) return "Enter a valid email address.";
      return undefined;

    case "address":
      if (!trimmed) return "Street address is required.";
      return undefined;

    case "city":
      if (!trimmed) return "City is required.";
      return undefined;

    case "postalCode":
      if (!trimmed) return "Postal code is required.";
      if (!POSTAL_CODE_REGEX.test(trimmed)) return "Enter a valid postal code.";
      return undefined;

    case "country":
      if (!trimmed) return "Country is required.";
      return undefined;

    case "cardName":
      if (!trimmed) return "Name on card is required.";
      return undefined;

    case "cardNumber": {
      const digits = digitsOnly(trimmed);
      if (!digits) return "Card number is required.";
      if (digits.length < 13 || digits.length > 19) return "Card number looks too short or too long.";
      if (!passesLuhnCheck(digits)) return "This card number doesn't look valid.";
      return undefined;
    }

    case "expiry":
      if (!trimmed) return "Expiry date is required.";
      if (!isExpiryValid(trimmed)) return "Enter a valid, non-expired MM/YY date.";
      return undefined;

    case "cvc": {
      const digits = digitsOnly(trimmed);
      if (!digits) return "CVC is required.";
      if (digits.length < 3 || digits.length > 4) return "CVC must be 3 or 4 digits.";
      return undefined;
    }

    default:
      return undefined;
  }
}

/** Validates the entire form; used on submit. */
export function validateCheckoutForm(values: CheckoutFormValues): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {};

  (Object.keys(values) as (keyof CheckoutFormValues)[]).forEach((field) => {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  });

  return errors;
}

export function isFormValid(errors: CheckoutFormErrors): boolean {
  return Object.keys(errors).length === 0;
}

// --- Input formatting helpers (used by the form for a nicer typing experience) ---

export function formatCardNumber(value: string): string {
  const digits = digitsOnly(value).slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

export function formatExpiry(value: string): string {
  const digits = digitsOnly(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function formatCvc(value: string): string {
  return digitsOnly(value).slice(0, 4);
}