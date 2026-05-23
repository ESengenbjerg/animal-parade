"use client";
export const dynamic = "force-dynamic";

import Background from "@/components/Background";
import BackToBtn from "@/components/BackToBtn";
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
  animalHeight,
} from "@/lib/api/types";
import Link from "next/link";

function AnimalContent() {
  const router = useRouter();
  const stamp = useStampFromQuery();
  const [paradeAnimal, setParadeAnimal] = useState<Animal | null>(null);
  const [introDone, setIntroDone] = useState(false);

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
    if (!paradeAnimal) return;

    const timer = setTimeout(() => {
      setIntroDone(true);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [paradeAnimal, stamp]);

  // When intro is done, animal animation + redirect to receipt:
  useEffect(() => {
    if (!paradeAnimal || !introDone) return;

    const duration = animalSpeed[paradeAnimal];
    const fadeTime = 800;

    const timer = setTimeout(() => {
      const overlay = document.getElementById("page-transition");
      overlay?.classList.add("active");
    }, duration - fadeTime);

    const redirectTimer = setTimeout(() => {
      router.push(
        `/receipt?stamp=${encodeURIComponent(JSON.stringify(stamp))}`,
      );
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };

    //   setTimeout(() => {
    //     router.push(
    //       `/receipt?stamp=${encodeURIComponent(JSON.stringify(stamp))}`,
    //     );
    //   }, 800); // Matches duration on CSS-animation
    // }, duration);
    // return () => clearTimeout(timer);
  }, [paradeAnimal, stamp, introDone, router]);

  // FIX?!
  // const stamp = useStampFromQuery();

  if (stamp === undefined) {
    return (
      <Background>
        <section className="flex flex-col items-center justify-center h-screen text-white">
          <p>Loading animal...</p>
        </section>
      </Background>
    );
  }

  if (stamp === null) {
    return (
      <Background>
        <section className="flex flex-col justify-center items-center gap-4 px-4 text-center">
          <ErrorMessage
            title="Invalid stamp"
            message="Sorry! Something went wrong. Please return to Loopland"
          />
          <BackToBtn />
        </section>
      </Background>
    );
  }

  const validation = validateStamp(stamp);

  // Fallback UI if not valid stamp
  if (!validation.valid) {
    return (
      <Background>
        <section className="flex flex-col justify-center items-center gap-4 px-4 text-center">
          <ErrorMessage
            title="Invalid stamp"
            message="Sorry! Something went wrong. Please return to Loopland"
          />
          <BackToBtn />
        </section>
      </Background>
    );
  }

  return (
    <Background>
      <div className="h-screen flex flex-col justify-between items-center">
        <section className="flex flex-col items-center justify-center h-1/2 text-center text-black text-base md:text-2xl px-4">
          {!paradeAnimal && (
            <p className="text-base md:text-2xl text-center">
              We are currently looking for your animal...
            </p>
          )}

          {paradeAnimal && (
            <>
              <h2 className="text:2xl md:text-3xl font-bold mb-4 md:mb-8">
                You got a {paradeAnimal}!
              </h2>

              <p className={!introDone ? "opacity-100" : "fade-out-text"}>
                The animal starts to appear... be patient!
              </p>
            </>
          )}
        </section>
        {/* This is the section where the animals moves  TRY w-full instead of w-screen */}
        <section className="flex items-end justify-end h-1/3 w-full overflow-x-hidden landscape:h-1/2 md:landscape:h-1/3">
          {paradeAnimal && (
            <div
              // Test sm:w-[250px] md:w-[300px] instead of width: "300px" for better mobile experience
              className={`absolute left-0 flex items-end justify-start overflow-visible 
                sm:w-62.5 md:w-75
                animal-wrapper animate-walk  ${
                  introDone ? "animate-running" : "animate-paused"
                }`}
              style={{
                animationDuration: `${animalSpeed[paradeAnimal]}ms`,
                // width: "300px", // locked width for proper animation
                height: animalHeight[paradeAnimal],
                transform: introDone ? "none" : "translateX(-350px)",
              }}
            >
              <img
                src={`/${paradeAnimal}.png`}
                alt={paradeAnimal}
                className="h-full w-auto object-left"
              />
            </div>
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
