import { ApiError, TransactionResponse } from "./types";

// Base URL to API (fallback llocalhost for dev)
const BASE_URL =
  process.env.NEXT_PUBLIC_CENTRALBANK_URL || "http://localhost:3000";

// API key, amusement validates itself to API
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

export async function startTransaction(
  identityToken: string,
  amount: number,
): Promise<TransactionResponse> {
  // Send request to API
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identity_token: identityToken, // Token from Loopland itself
      amount, // Entrance fee
      api_key: API_KEY, // Validator
    }),
  });

  // If error response, throw error to show in UI
  if (!res.ok) {
    const err = (await res.json()) as ApiError;
    throw err;
  }

  // Success -> return response
  return res.json();
}
