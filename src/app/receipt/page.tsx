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
  }, []);

  // Fallback UI if stamp is invalid
  if (!validation.valid) {
    return (
      <Background>
        <ErrorMessage
          title="Missing or invalid stamp"
          message="We could not find your stamp. Please return to Loopland"
        />
        <article className="mt-12">
          <BackToBtn />
          {/* <Link href="https://loopland.se/">
            <button className="px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg bg-orange-400 hover:bg-orange-500 text-white transition">
            Go back to Loopland
            </button>
            </Link> */}
        </article>
      </Background>
    );
  }

  return (
    <Background>
      <section className="flex flex-col items-center justify-center h-full text-center text-2xl text-black mx-4">
        <article
          id="receipt-card"
          className="bg-white rounded-xl border border-gray-300 shadow-2xl mt-1 p-4 w-[95%] h-[85%] max-w-md md:p-8 md_max-w-lg"
        >
          <h1 className="text-2xl font-bold mb-6 md:4-xl">Your Receipt</h1>

          <p className="text-base md:text-xl mb-4">
            <span className="font-semibold">Entrance fee:</span> 2 euro
          </p>

          {stamp ? (
            <div className="mb-8">
              <p className="text-base md:text-xl mb-2">
                <span className="font-semibold">Stamp received:</span>
              </p>
              <p className="text-base md:text-xl mb-4">
                {stamp.metal && <span>{stamp.metal} </span>}
                {stamp.animal}
              </p>

              {stamp.image_url ? (
                <div className="flex justify-center">
                  <img
                    src={stamp.image_url}
                    alt={`${stamp.metal ? stamp.metal + " " : ""}${stamp.animal}`}
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

        <article className="h-[15%] flex justify-center items-center">
          <BackToBtn />
        </article>
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
