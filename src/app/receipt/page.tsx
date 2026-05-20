"use client";

import Background from "@/components/Background";
import { useStampFromQuery } from "@/hooks/useStampFromQuery";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import type { ParadeStamp } from "@/lib/api/types";
import Link from "next/link";

function ReceiptContent() {
  const searchParams = useSearchParams();
  // const [stamp, setStamp] = useState<ParadeStamp | null>(null);

  // Parse stamp from query
  const stamp = useStampFromQuery();

  // Fade in effects
  useEffect(() => {
    const overlay = document.getElementById("page-transition");
    const receipt = document.getElementById("receipt-card");

    // Start on black page
    overlay?.classList.add("active");

    // Fade in page
    setTimeout(() => {
      overlay?.classList.remove("active");
    }, 50);

    // Fade in receipt
    setTimeout(() => {
      receipt?.classList.add("opacity-100", "translate-y-0");
    }, 350);
  }, []);

  // useEffect(() => {
  //   const raw = searchParams.get("stamp");
  //   if (!raw) return;

  //   try {
  //     const parsed = JSON.parse(raw) as ParadeStamp;
  //     setStamp(parsed);
  //   } catch (err) {
  //     console.log("Failed to parse stamp:", err);
  //   }
  // }, [searchParams]);

  return (
    <Background>
      <section className="flex flex-col items-center justify-center h-full text-center text-2xl text-black">
        <article
          id="recept-card"
          className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md
            opacity-0 translate-y-4
            transition-all duration-700"
        >
          <h1 className="text-4xl font-bold mb-6">Your Receipt</h1>

          <p className="text-xl mb-4">
            <span className="font-semibold">Entrance fee:</span> 2 euro
          </p>

          {stamp ? (
            <div className="mb-8">
              <p className="text-xl mb-2">
                <span className="font-semibold">Stamp received:</span>
              </p>
              <p className="text-xl mb-4">
                {stamp.metal && <span>{stamp.metal} </span>}
                {stamp.animal}
              </p>

              {stamp.image_url ? (
                <div className="flex justify-center">
                  <img
                    src={stamp.image_url}
                    alt={stamp.metal && stamp.animal}
                    className="w-40 h-40 object-contain border border-gray-300 rounded-lg shadow-sm"
                  />
                </div>
              ) : (
                <p>No image was found</p>
              )}
            </div>
          ) : (
            <p className="text-lg text-red-700">No stamp found.</p>
          )}
        </article>

        <Link href="https://frontend-main-1ac7.up.railway.app/user">
          <button className="mt-8 px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg bg-orange-400 hover:bg-orange-500 text-white transition">
            Go back to Tivoli
          </button>
        </Link>
      </section>
    </Background>
  );
}

export default function ReceiptPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReceiptContent />
    </Suspense>
  );
}
