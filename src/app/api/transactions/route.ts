"use server";

// src/app/api/transactions/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // { identity_token, amount }
    const { identity_token, amount } = body ?? {};

    if (!identity_token || typeof identity_token !== "string") {
      return NextResponse.json(
        { error: "identity_token_required" },
        { status: 400 },
      );
    }

    if (amount == null) {
      return NextResponse.json({ error: "amount_required" }, { status: 400 });
    }

    // The amusement UUID is also used as your X-Api-Key (they are the same secret)
    const amusementUuid = process.env.AMUSEMENT_UUID;

    if (!amusementUuid) {
      return NextResponse.json(
        {
          error: "server_misconfigured",
          message: "Missing AMUSEMENT_UUID in server environment",
        },
        { status: 500 },
      );
    }

    const resp = await fetch("https://external.api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Use the same secret for the X-Api-Key header
        "X-Api-Key": amusementUuid,
      },
      body: JSON.stringify({
        identity_token,
        amount,
        amusement_uuid: amusementUuid,
      }),
    });

    if (resp.status === 401) {
      // Clear message so frontend can show a friendly prompt and link the player back to login/entry
      return NextResponse.json(
        {
          error: "identity_token_invalid_or_expired",
          message: "Your identity token is invalid...",
          relogin_url: "https://tivoli-develop.up.railway.app/",
        },
        { status: 401 },
      );
    }

    // If external API returned success, redirect the browser to the animal page
    if (resp.ok) {
      // Use 303 See Other so the browser performs a GET to /animal
      return NextResponse.redirect(new URL("/animal", req.url), 303);
    }

    // For other non-success responses, forward the error JSON
    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    return NextResponse.json(
      { error: "server_error", message: String(err) },
      { status: 500 },
    );
  }
}
