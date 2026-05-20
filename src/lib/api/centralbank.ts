import { ApiError, TransactionResponse } from "./types";

const BASE_URL =
  process.env.NEXT_PUBLIC_CENTRALBANK_URL || "http://localhost:3000";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

// ------------------------- START OF ERROR SIMULATOR -------------------------
// Mock helper to simulate API errors
// function simulateError(): void {
//   if (typeof window !== "undefined") {
//     const scenario = new URLSearchParams(window.location.search).get("error");

//     switch (scenario) {
//       case "expired":
//         throw new Error("Invalid or expired identity token");
//       case "apikey":
//         throw new Error("Invalid api_key");
//       case "balance":
//         throw new Error("Insufficient balance");
//       case "unknown":
//         throw new Error("Server meltdown");
//       default:
//         return;
//     }
//   }
// }

// ------------------------- END OF ERROR SIMULATOR -------------------------

export async function startTransaction(
  identityToken: string,
  amount: number,
): Promise<TransactionResponse> {
  // // SIMULATE ERRORS
  // simulateError();

  // // 2. MOCK MODE — ONLY when no error scenario is active
  // const scenario =
  //   typeof window !== "undefined"
  //     ? new URLSearchParams(window.location.search).get("error")
  //     : null;

  // // Skip real fetch during UI testing
  // if (process.env.NEXT_PUBLIC_MOCK_MODE === "true" && !scenario) {
  //   return {
  //     stamp: {
  //       stamptype: {
  //         animal: "lion",
  //         metal: "gold",
  //         image_url: "https://example.com/lion.png",
  //       },
  //     },
  //   } as TransactionResponse;
  // }

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
