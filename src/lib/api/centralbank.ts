import { ApiError, TransactionResponse } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_CENTRALBANK_URL;
const API_KEY = process.env.NEXT_PUBLIC_AMUSEMENT_UUID!;

export async function startTransaction(
  identityToken: string,
  amount: number,
  amusementUuid: string,
): Promise<TransactionResponse> {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": API_KEY,
    },
    body: JSON.stringify({
      identity_token: identityToken,
      amount,
      amusement_uuid: amusementUuid,
    }),
  });

  if (!res.ok) {
    const err = (await res.json()) as ApiError;
    throw err;
  }

  return res.json();
}
