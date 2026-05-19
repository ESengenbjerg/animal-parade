"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ParadeStamp, stampAnimals, validMetals } from "@/lib/api/types";

export function useStampFromQuery(): ParadeStamp | null {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [stamp, setStamp] = useState<ParadeStamp | null>(null);

  useEffect(() => {
    const raw = searchParams.get("stamp");
    if (!raw) {
      router.replace("/");
      return;
    }

    try {
      const parsed = JSON.parse(raw) as ParadeStamp;

      // Validate animal and metal
      const isValidAnimal = stampAnimals.includes(parsed.animal);
      const isValidMetal =
        parsed.metal === undefined || validMetals.includes(parsed.metal);

      if (!isValidAnimal || !isValidMetal) {
        router.replace("/");
        return;
      }

      setStamp(parsed);
    } catch (err) {
      console.error("Failed to parse stamp:", err);
      router.replace("/");
    }
  }, [searchParams, router]);

  return stamp;
}
