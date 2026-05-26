"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShowStamp, stampAnimals, validMetals } from "@/lib/api/types";

// Type guard for ShowStamp
function isValidShowStamp(value: unknown): value is ShowStamp {
  if (typeof value !== "object" || value === null) return false;

  const v = value as Record<string, unknown>;

  const hasValidAnimal =
    typeof v.animal === "string" && stampAnimals.includes(v.animal as any);

  const hasValidMetal =
    v.metal === undefined ||
    (typeof v.metal === "string" && validMetals.includes(v.metal as any));

  return hasValidAnimal && hasValidMetal;
}

export function useStampFromQuery() {
  const searchParams = useSearchParams();
  const [stamp, setStamp] = useState<ShowStamp | null | undefined>(undefined);

  useEffect(() => {
    const raw = searchParams.get("stamp");

    if (raw === null) {
      setStamp(null);
      return;
    }

    try {
      const parsed = JSON.parse(raw);

      //   if (isValidShowStamp(parsed)) {
      //     setStamp(parsed);
      //   } else {
      //     console.error("Invalid stamp structure", parsed);
      //     setStamp(null);
      //   }
      setStamp(parsed);
    } catch (err) {
      console.error("Failed to parse stamp:", err);
      setStamp(null);
    }
  }, [searchParams]);

  return stamp;
}
