"use client";
import Image from "next/image";
import Background from "@/components/Background";
import { useEffect, useState } from "react";
import { startTransaction } from "@/lib/api/centralbank";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
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
        process.env.NEXT_PUBLIC_AMUSEMENT_UUID!, // Amusement's Api key
      );

      // Attach stamp in API response to URL
      // Redirect to attraction page
      router.push(
        `/animal?stamp=${encodeURIComponent(JSON.stringify(result.stamp))}`,
      );
    } catch (err) {
      console.error(err);
      alert("Your token has expired. Please return to the Tivoli.");
      router.push("https://tivoli-develop.up.railway.app/");
    }
  }

  return (
    // <main
    //   className="h-screen bg-cover bg-center"
    //   style={{ backgroundImage: "url(/background.jpg)" }}
    // >
    <Background>
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
    </Background>
    // </main>
  );
}
