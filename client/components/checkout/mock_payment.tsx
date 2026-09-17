

import type { CheckoutFormValues } from "./checkout_form_validation";

export interface PaymentSuccess {
  status: "success";
  transactionId: string;
}

export interface PaymentFailure {
  status: "error";
  message: string;
}

export type PaymentResponse = PaymentSuccess | PaymentFailure;

function generateTransactionId(): string {
  return `MOCK-${Date.now().toString(36).toUpperCase()}-${Math.floor(
    Math.random() * 9000 + 1000
  )}`;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export async function processMockPayment(
  values: Pick<CheckoutFormValues, "cardNumber" | "cardName" | "expiry" | "cvc">,
  amount: number
): Promise<PaymentResponse> {
  await delay(1200 + Math.random() * 600);

  const digits = values.cardNumber.replace(/\D/g, "");

  if (digits.endsWith("0000")) {
    return {
      status: "error",
      message: "Your card was declined. Please try a different payment method.",
    };
  }

  if (amount <= 0) {
    return {
      status: "error",
      message: "Order total must be greater than zero.",
    };
  }

  return {
    status: "success",
    transactionId: generateTransactionId(),
  };
}