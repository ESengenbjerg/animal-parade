"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShowStamp, stampAnimals, validMetals } from "@/lib/api/types";

// Type guard for ShowStamp
function isValidShowStamp(value: unknown): value is ShowStamp {
  if (typeof value !== "object" || value === null) return false;

  const v = value as Record<string, unknown>;

  // Valid animal
  const hasValidAnimal =
    typeof v.animal === "string" && stampAnimals.includes(v.animal as any);

  // Valid metal (or null)
  const hasValidMetal =
    v.metal === undefined ||
    v.metal === null ||
    (typeof v.metal === "string" && validMetals.includes(v.metal as any));

  // Return valid stamp
  return hasValidAnimal && hasValidMetal;
}

// Custom hook - fetch & validate stamp from query, returns stamp if valid
export function useStampFromQuery() {
  // Fetch query from URL
  const searchParams = useSearchParams();
  const [stamp, setStamp] = useState<ShowStamp | null | undefined>(undefined);

  useEffect(() => {
    // Fetch raw stamp in query
    const raw = searchParams.get("stamp");

    // Missing stamp -> return
    if (raw === null) {
      setStamp(null);
      return;
    }

    // If stamp, validate it
    try {
      // Parse raw stamp
      const parsed = JSON.parse(raw);

      // Run type guard
      if (isValidShowStamp(parsed)) {
        setStamp(parsed);
      } else {
        console.error("Invalid stamp structure", parsed);
        setStamp(null);
      }
      //   setStamp(parsed);
    } catch (err) {
      console.error("Failed to parse stamp:", err);
      setStamp(null);
    }
  }, [searchParams]);

  // Return valid stamp
  return stamp;
}
