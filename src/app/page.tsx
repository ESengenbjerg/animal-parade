"use client";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { startTransaction } from "@/lib/api/centralbank";
import { useRouter, useSearchParams } from "next/navigation";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Read token from URL
  useEffect(() => {
    const t = searchParams.get("identity_token");
    if (t) {
      setToken(t);
      // Remove token from URL
      window.history.replaceState(null, "", "/");
    }
  }, [searchParams]);

  async function handleStart() {
    if (!token) return;

    try {
      setLoading(true);

      const result = await startTransaction(
        token, //Token from URL
        2, // Entrance fee
        // process.env.NEXT_PUBLIC_API_KEY!, // Amusement's Api key
      );

      // Check what transaction request retruns:
      console.log("Transaction result:", result);

      // Attach stamp in API response to URL
      // Redirect to attraction page
      // router.push(
      //   `/animal?stamp=${encodeURIComponent(JSON.stringify(result.stamp))}`,
      // );
      router.push(
        `/animal?stamp=${encodeURIComponent(
          JSON.stringify({
            animal: result.stamp.stamptype.animal,
            metal: result.stamp.stamptype?.metal ?? undefined,
            image_url: result.stamp.stamptype?.image_url ?? undefined,
          }),
        )}`,
      );
    } catch (err: any) {
      console.error("RAW ERROR:", err);

      if (typeof err === "object" && err !== null) {
        console.error("ERROR KEYS:", Object.keys(err));
      } else {
        console.error("ERROR TYPE:", typeof err);
      }

      if (err?.message === "Invalid or expired identity token") {
        alert("Your token has expired. Please return to the Tivoli.");
      } else if (err?.message === "Invalid api_key") {
        alert("Your API key is invalid.");
      } else if (err?.message === "Insufficient balance") {
        alert("You do not have enough balance.");
      } else {
        alert("Unexpected error. Check console.");
      }

      // router.push("https://frontend-main-1ac7.up.railway.app/user");
    }
  }

  return (
    <main
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/background.jpg)" }}
    >
      <section className="flex flex-col items-center justify-evenly h-full text-black">
        <article className="pb-8">
          <h1 className="font-bold text-4xl">Welcome to the animal parade!</h1>
          <p>
            Here you may see some exotic animals in their natural behaviour.
          </p>
          <p>
            <span className="font-extrabold">Entrance fee: </span>2 euro
          </p>
        </article>
        <article className="pt-48">
          <button
            onClick={handleStart}
            disabled={!token || loading}
            className="px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg bg-orange-400 hover:bg-orange-500 text-white transition"
          >
            {loading ? "Loading..." : "See an animal"}
          </button>
          {!token && (
            <p className="text-sm text-red-700 mt-4">
              <strong>ERROR! </strong> You must enter through the Tivoli to play
            </p>
          )}
        </article>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
