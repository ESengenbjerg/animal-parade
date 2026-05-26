"use client";

import Background from "@/components/Background";
import BackToBtn from "@/components/BackToBtn";
import ErrorMessage from "@/components/ErrorMessage";
import { validateStamp } from "@/lib/validateStamp";
import { useStampFromQuery } from "@/hooks/useStampFromQuery";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function ReceiptContent() {
  // const searchParams = useSearchParams();

  // Fetch & validate stamp from query
  const stamp = useStampFromQuery();
  const validation = validateStamp(stamp);

  // Fade in effects
  useEffect(() => {
    const overlay = document.getElementById("page-transition");
    overlay?.classList.add("active");
    setTimeout(() => {
      overlay?.classList.remove("active");
    }, 50);
  }, []);

  // Fallback UI if stamp is invalid/missing
  if (!validation.valid) {
    return (
      <Background>
        <section className="w-screen h-screen flex flex-col justify-center items-center gap-4 px-4 text-center">
          <article className="w-1/3">
            <ErrorMessage
              title="Missing or invalid stamp"
              message="We could not find your stamp. Please return to Loopland"
            />
            <BackToBtn />
          </article>
        </section>
      </Background>
    );
  }

  return (
    <Background>
      <section className="flex flex-col items-center justify-between h-full text-center text-2xl text-black mx-4">
        <article
          id="receipt-card"
          className="bg-white rounded-xl border border-gray-300 shadow-2xl mt-1 p-4 w-[95%] h-fit max-w-md md:p-8 md:max-w-xl md:mt-4"
        >
          <h1 className="text-2xl font-bold mb-6 landscape:mb-2 md:landscape:4-xl">
            Your Receipt
          </h1>

          {stamp ? (
            <div className="landscape:flex landscape:justify-around landscape:items-center md:landscape:flex-col">
              <div>
                <p className="text-base md:text-xl mb-4">
                  <span className="font-semibold">Entrance fee:</span> 2 euro
                </p>
                <p className="text-base md:text-xl mb-2">
                  <span className="font-semibold">Stamp received:</span>
                </p>
                <p className="text-base md:text-xl mb-4 landscape:mb-2 md:landscape:mb-4">
                  {stamp.metal && <span>{stamp.metal} </span>}
                  {stamp.animal}
                </p>
              </div>

              {stamp.image_url ? (
                <div className="flex justify-center mb-8 landscape:mb-2 md:landscape:mb-8">
                  <img
                    src={stamp.image_url}
                    alt={`${stamp.metal ? stamp.metal + " " : ""}${stamp.animal}`}
                    className="w-40 object-contain border border-gray-300 rounded-lg shadow-sm"
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

        <article className="h-full flex justify-end items-end mb-4">
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
