"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ParadeStamp,
  Animal,
  paradeAnimals,
  animalSpeed,
  //   Animals,
  stampAnimals,
  validMetals,
} from "@/lib/api/types";

function AnimalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [stamp, setStamp] = useState<ParadeStamp | null>(null);
  const [paradeAnimal, setParadeAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    // If stamp is missing -> send to start page, protects the flow
    const raw = searchParams.get("stamp");
    if (!raw) {
      router.replace("/");
      return;
    }

    // Parse stamp from query, validate it
    try {
      const parsed = JSON.parse(raw) as ParadeStamp;

      // Animal in stamp must be of valid type
      if (!stampAnimals.includes(parsed.animal)) {
        router.replace("/");
        return;
      }

      // If metal is present, it must be valid
      if (parsed.metal !== undefined && !validMetals.includes(parsed.metal)) {
        router.replace("/");
        return;
      }

      // Stamp is valid
      setStamp(parsed);
    } catch (err) {
      console.error("Failed to parse stamp:", err);
      // If invalid stamp
      router.replace("/");
    }
  }, [searchParams, router]);

  // Pick random parade animal
  useEffect(() => {
    if (!stamp) return;

    const random =
      paradeAnimals[Math.floor(Math.random() * paradeAnimals.length)];
    setParadeAnimal(random);
  }, [stamp]);

  // Start animation timer for choosen animal
  useEffect(() => {
    if (!paradeAnimal || !stamp) return;

    const duration = animalSpeed[paradeAnimal];

    const timer = setTimeout(() => {
      router.push(
        `/receipt?stamp=${encodeURIComponent(JSON.stringify(stamp))}`,
      );
    }, duration);

    return () => clearTimeout(timer);
  }, [paradeAnimal, stamp, router]);

  return (
    <main
      className="h-screen bg-cover bg-center text-2xl text-black flex flex-col justify-between items-center"
      style={{ backgroundImage: "url(/background.jpg)" }}
    >
      <section className="flex flex-col items-center justify-center h-full">
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
            <p>The animal starts to appear... be patient!</p>
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
    </main>
  );
}

export default function AnimalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimalContent />
    </Suspense>
  );
}
