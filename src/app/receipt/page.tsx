"use client";

import Background from "@/components/Background";
import BackToBtn from "@/components/BackToBtn";
import ErrorMessage from "@/components/ErrorMessage";
import { validateStamp } from "@/lib/validateStamp";
import { useStampFromQuery } from "@/hooks/useStampFromQuery";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import type { ParadeStamp } from "@/lib/api/types";
import Link from "next/link";

function ReceiptContent() {
  const searchParams = useSearchParams();

  // Parse stamp from query
  const stamp = useStampFromQuery();

  // Validate stamp
  const validation = validateStamp(stamp);

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
    //   setTimeout(() => {
    //     if (!receipt) return;

    //     receipt.style.opacity = "1";
    //     receipt.style.transform = "translateY(0)";
    //     // receipt?.classList.add("opacity-100", "translate-y-0");
    //   }, 350);
  }, []);

  // Fallback UI if stamp is invalid
  if (!validation.valid) {
    return (
      <Background>
        <ErrorMessage
          title="Missing or invalid stamp"
          message="We could not find your stamp. Please return to the Tivoli"
        />
        <article className="mt-12">
          <Link href="https://loopland.se/">
            <button className="px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg bg-orange-400 hover:bg-orange-500 text-white transition">
              Go back to Tivoli
            </button>
          </Link>
        </article>
      </Background>
    );
  }

  return (
    <Background>
      <section className="flex flex-col items-center justify-center h-full text-center text-2xl text-black">
        <article
          id="receipt-card"
          className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
          // transition-all duration-700"
          // style={{ opacity: 0, transform: "translateY(1rem)" }}
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

        <BackToBtn />
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
