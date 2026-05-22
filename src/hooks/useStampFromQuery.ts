"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ApiStamp,
  ParadeStamp,
  stampAnimals,
  validMetals,
} from "@/lib/api/types";

// Type guard for ParadeStamp
function isParadeStamp(value: unknown): value is ParadeStamp {
  if (typeof value !== "object" || value === null) return false;

  const v = value as Record<string, unknown>;

  const hasValidAnimal =
    typeof v.animal === "string" && stampAnimals.includes(v.animal as any);

  const hasValidMetal =
    v.metal === undefined ||
    (typeof v.metal === "string" && validMetals.includes(v.metal as any));

  return hasValidAnimal && hasValidMetal;
}

// export function useStampFromQuery(): ParadeStamp | null {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [stamp, setStamp] = useState<ParadeStamp | null>(null);

//   useEffect(() => {
//     const raw = searchParams.get("stamp");
//     if (!raw) {
//       //   router.replace("/");
//       return;
//     }

//     try {
//       const parsed = JSON.parse(raw);

//       if (!isParadeStamp(parsed)) {
//         router.replace("/");
//         return;
//       }

//       setStamp(parsed);
//     } catch (err) {
//       console.error("Failed to parse stamp:", err);
//       router.replace("/");
//     }
//   }, [searchParams, router]);

//   return stamp;
// }
export function useStampFromQuery() {
  const searchParams = useSearchParams();
  const [stamp, setStamp] = useState<ApiStamp | null | undefined>(undefined);

  useEffect(() => {
    const raw = searchParams.get("stamp");

    if (raw === null) {
      setStamp(null);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      setStamp(parsed);
    } catch (err) {
      console.error("Failed to parse stamp:", err);
      setStamp(null);
    }
  }, [searchParams]);

  return stamp;
}
