import { ApiError, TransactionResponse } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_CENTRALBANK_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

export async function startTransaction(
  identityToken: string,
  amount: number,
  //   API_KEY: string,
): Promise<TransactionResponse> {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identity_token: identityToken,
      amount,
      api_key: API_KEY,
    }),
  });

  if (!res.ok) {
    const err = (await res.json()) as ApiError;
    throw err;
  }

  return res.json();
}
