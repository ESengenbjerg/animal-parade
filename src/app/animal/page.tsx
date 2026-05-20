"use client";
export const dynamic = "force-dynamic";

import Background from "@/components/Background";
import ErrorMessage from "@/components/ErrorMessage";
import { validateStamp } from "@/lib/validateStamp";
import { Suspense, useEffect, useState } from "react";
import { useStampFromQuery } from "@/hooks/useStampFromQuery";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ParadeStamp,
  Animal,
  paradeAnimals,
  animalSpeed,
  stampAnimals,
  validMetals,
} from "@/lib/api/types";
import Link from "next/link";

function AnimalContent() {
  const router = useRouter();
  const stamp = useStampFromQuery();
  const [paradeAnimal, setParadeAnimal] = useState<Animal | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const validation = validateStamp(stamp);

  // Fallback UI if not valid stamp
  if (!validation.valid) {
    return (
      <Background>
        <section className="flex flex-col justify-center items-center">
          <ErrorMessage
            title="Invalid stamp"
            message="Sorry! Something went wrong. Please return to the Tivoli"
          />
          <article className="mt-12">
            <Link href="https://frontend-main-1ac7.up.railway.app/user">
              <button className="px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg bg-orange-400 hover:bg-orange-500 text-white transition">
                Go back to Tivoli
              </button>
            </Link>
          </article>
        </section>
      </Background>
    );
  }

  // Page transition
  useEffect(() => {
    const overlay = document.getElementById("page-transition");

    //Start black
    overlay?.classList.add("active");

    // Fade in by removing class
    setTimeout(() => {
      overlay?.classList.remove("active");
    }, 50);
  }, []);

  // Initial delay - for nice UI experience, even with fast animals
  const initialDelay = 6000;

  // Pick random parade animal
  useEffect(() => {
    if (!stamp) return;

    const random =
      paradeAnimals[Math.floor(Math.random() * paradeAnimals.length)];
    setParadeAnimal(random);
  }, [stamp]);

  // Start intro delay timer when animal is choosen
  useEffect(() => {
    if (!paradeAnimal || !stamp) return;

    const timer = setTimeout(() => {
      setIntroDone(true);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [paradeAnimal]);

  // When intro is done:
  useEffect(() => {
    if (!paradeAnimal || !stamp || !introDone) return;

    const duration = animalSpeed[paradeAnimal];

    const timer = setTimeout(() => {
      const overlay = document.getElementById("page-transition");
      overlay?.classList.add("active");

      setTimeout(() => {
        router.push(
          `/receipt?stamp=${encodeURIComponent(JSON.stringify(stamp))}`,
        );
      }, 800); // Matches duration on CSS-animation
    }, duration);

    return () => clearTimeout(timer);
  }, [paradeAnimal, stamp, introDone, router]);

  return (
    <Background>
      <div className="h-screen flex flex-col justify-between items-center">
        <section className="flex flex-col items-center justify-center h-full text-2xl text-black">
          <h1>This is the animal page where all the animal thrives</h1>
          {!paradeAnimal && (
            <p className="text-2xl">
              We are currently looking for your animal...
            </p>
          )}

          {paradeAnimal && (
            <>
              <h2 className="text-3xl font-bold mb-8">
                You got a {paradeAnimal}!
              </h2>

              <p className={!introDone ? "opacity-100" : "fade-out-text"}>
                The animal starts to appear... be patient!
              </p>
            </>
          )}
        </section>
        {/* This is the section where the animals moves */}
        <section className="flex items-center justify-center h-1/3 w-screen overflow-x-hidden">
          {paradeAnimal && (
            <img
              src={`/${paradeAnimal}.png`}
              alt={paradeAnimal}
              style={{ animationDuration: `${animalSpeed[paradeAnimal]}ms` }}
              className="w-64 h-auto animate-walk"
            />
          )}
        </section>
      </div>
    </Background>
  );
}

export default function AnimalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimalContent />
    </Suspense>
  );
}
