"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Stamp,
  Animal,
  paradeAnimals,
  animalSpeed,
  Animals,
  stampAnimals,
} from "@/lib/api/types";

export default function AnimalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [stamp, setStamp] = useState<Stamp | null>(null);
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
      const parsed = JSON.parse(raw) as Stamp;

      // Animal in stamp must be of valid type
      if (!stampAnimals.includes(parsed.animal)) {
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
      className="h-screen bg-cover bg-center text-2xl text-black"
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
      <section>
        <p>This is the section where the animals moves</p>
      </section>
    </main>
  );
}
