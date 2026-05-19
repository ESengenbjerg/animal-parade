"use client";
import Image from "next/image";
import Background from "@/components/Background";
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
      // } catch (err: any) {
      //   console.error("RAW ERROR:", err);

      //   if (typeof err === "object" && err !== null) {
      //     console.error("ERROR KEYS:", Object.keys(err));
      //   } else {
      //     console.error("ERROR TYPE:", typeof err);
      //   }

      //   if (err?.message === "Invalid or expired identity token") {
      //     alert("Your token has expired. Please return to the Tivoli.");
      //   } else if (err?.message === "Invalid api_key") {
      //     alert("Your API key is invalid.");
      //   } else if (err?.message === "Insufficient balance") {
      //     alert("You do not have enough balance.");
      //   } else {
      //     alert("Unexpected error. Check console.");
      //   }
    } catch (err: any) {
      console.error("RAW ERROR:", err);

      let title = "Unexpected error";
      let message = "Something went wrong. Check console for details.";

      if (err?.message === "Invalid or expired identity token") {
        title = "Token expired";
        message = "Your token has expired. Please return to the Tivoli.";
      } else if (err?.message === "Invalid api_key") {
        title = "Invalid API key";
        message = "Your API key is invalid.";
      } else if (err?.message === "Insufficient balance") {
        title = "Insufficient balance";
        message = "You do not have enough balance.";
      }

      setModalTitle(title);
      setModalMessage(message);
      setModalOpen(true);

      return; // Stop redirecting immediately
    }

    // router.push("https://frontend-main-1ac7.up.railway.app/");
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
      <Modal
        open={modalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={() => {
          setModalOpen(false);
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
