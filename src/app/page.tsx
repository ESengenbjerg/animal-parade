"use client";
import Image from "next/image";
import Background from "@/components/Background";
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
        router.push(
          `/animal?stamp=${encodeURIComponent(
            JSON.stringify({
              animal: result.stamp.stamptype.animal,
              metal: result.stamp.stamptype?.metal ?? undefined,
              image_url: result.stamp.stamptype?.image_url ?? undefined,
            }),
          )}`,
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
          message = "Your token has expired. Please return to the Tivoli.";
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
      // if (err?.message === "Invalid or expired identity token") {
      //   title = "Token expired";
      //   message = "Your token has expired. Please return to the Tivoli.";
      // } else if (err?.message === "Invalid api_key") {
      //   title = "Invalid API key";
      //   message = "Your API key is invalid.";
      // } else if (err?.message === "Insufficient balance") {
      //   title = "Insufficient balance";
      //   message = "You do not have enough balance.";
      // }

      setModalTitle(title);
      setModalMessage(message);
      setModalOpen(true);

      return;
    }
  }

  return (
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
        <article className="pt-48 flex flex-col justify-center items-center">
          {/* <button
            onClick={handleStart}
            disabled={!token || loading}
            className="px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg max-w-64 bg-orange-400 hover:bg-orange-500 text-white transition"
          >
            {loading ? "Loading..." : "See an animal"}
          </button> */}
          <button
            onClick={handleStart}
            disabled={!token || loading}
            aria-disabled={!token || loading}
            className={`px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg transition
              ${
                !token || loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-orange-400 hover:bg-orange-500 text-white"
              }`}
          >
            {loading ? "Loading..." : "See an animal"}
          </button>

          {!token && (
            // <p className="text-sm text-red-700 mt-4">
            //   <strong>ERROR! </strong> You must enter through the Tivoli to play
            // </p>
            <div className="mt-6">
              <ErrorMessage
                title="Missing token"
                message="You must enter through the Tivoli"
              />
            </div>
          )}
        </article>
      </section>
      <Modal
        open={modalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={() => {
          setModalOpen(false);
          // Redirect back to tivoli
          router.push("https://frontend-main-1ac7.up.railway.app/");
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
