"use client";
import Image from "next/image";
import Background from "@/components/Background";
import BackToBtn from "@/components/BackToBtn";
import ErrorMessage from "@/components/ErrorMessage";
import { mapError } from "@/lib/error";
import { Suspense, useEffect, useState } from "react";
import { useIdentityToken } from "@/hooks/useIdentityToken";
import { startTransaction } from "@/lib/api/centralbank";
import Modal from "@/components/Modal";
import { useRouter, useSearchParams } from "next/navigation";

function HomeContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // Read token from URL
  const token = useIdentityToken();

  async function handleStart() {
    if (!token) return;

    try {
      setLoading(true);

      // --- AUDIO ARMING ---
      const audio = new Audio("/sound.mp3");
      await audio.play(); // allowed because user clicked
      audio.pause(); // stop immediately
      sessionStorage.setItem("playAudio", "true");
      // ---------------------

      const result = await startTransaction(
        token, //Token from URL
        2, // Entrance fee
      );

      // Check what transaction request retruns:
      console.log("Transaction result:", result);

      // Page transition
      const overlay = document.getElementById("page-transition");
      overlay?.classList.add("active");

      // Attach stamp in API response to URL
      // Redirect to attraction page
      setTimeout(() => {
        // NEW API RESPONSE
        // If (no stamp) -> modal with information:
        if (!result.stamp) {
          setModalTitle("No stamp for you!");
          setModalMessage(
            "Oh? So you wanted another stamp? 3 minutes have not passed since your last visit to this amusement. GET OUT OF HERE!",
          );
          setModalOpen(true);
          setLoading(false);
          return;
        }

        // Valid stamp -> go to /animal
        router.push(
          `/animal?stamp=${encodeURIComponent(JSON.stringify(result.stamp))}`,
        );
      }, 800); // Match duration in CSS animation
    } catch (err: any) {
      console.error("RAW ERROR:", err);
      const code = mapError(err);

      let title = "Unexpected error";
      let message = "Something went wrong. Check console for details.";

      switch (code) {
        case "TOKEN_EXPIRED":
          title = "Token expired";
          message = "Your token has expired. Please return to Loopland.";
          break;

        case "INVALID_API_KEY":
          title = "Invalid API key";
          message = "Your API key is invalid.";
          break;

        case "INSUFFICIENT_BALANCE":
          title = "Insufficient balance";
          message = "You do not have enough money.";
          break;
      }

      setModalTitle(title);
      setModalMessage(message);
      setModalOpen(true);
      setLoading(false);
    }
  }

  return (
    <Background>
      <section className="flex flex-col items-center justify-around h-full text-black mx-4">
        <article className="">
          <h1 className="text-2xl font-bold text-center md:text-4xl">
            Welcome to the animal parade!
          </h1>
          <p className="text-base md:text-lg text-center px-4">
            Here you may see some exotic animals in their natural behaviour.
          </p>
          <p className="text-base md:text-lg text-center px-4">
            <span className="font-extrabold">Entrance fee: </span>2 euro
          </p>
        </article>
        <div className="bg-white/70 flex items-center justify-center text-m text-center font-bold md:hidden portrait:flex landscape:hidden">
          <p>
            We recommend you to rotate your device to landscape for premium
            experience
          </p>
        </div>
        <article className="w-full flex flex-col justify-between items-center gap-2 landscape:gap-8 md:pt-48 md:w-1/4 md:landscape:gap-2">
          {!token && (
            <div className="w-full flex flex-col items-center">
              <ErrorMessage
                title="Missing token"
                message="You must enter through Loopland"
              />
            </div>
          )}

          <div className="w-full flex flex-col justify-between items-center gap-2 landscape:flex-row landscape:gap-4 md:landscape:flex-col">
            <button
              onClick={handleStart}
              disabled={!token || loading}
              aria-disabled={!token || loading}
              className={`w-full px-6 py-3 text-xl md:px-8 md:py-4 md:text-2xl font-semibold rounded-xl shadow-lg transition
              ${
                !token || loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-orange-400 hover:bg-orange-500 text-white"
              }`}
            >
              {loading ? "Loading..." : "See an animal"}
            </button>

            {/* <BackToBtn /> */}
            <BackToBtn tokenValid={!!token && !loading} />
          </div>
        </article>
      </section>
      <Modal
        open={modalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={() => {
          setModalOpen(false);
          // Redirect back to Loopland - HOW TO HANDLE THIS WITH IFRAME? Use <BackToBtn /> in modal?
          router.push("https://loopland.se/");
        }}
      />
    </Background>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
