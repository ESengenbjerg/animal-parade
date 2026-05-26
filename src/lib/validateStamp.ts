import { stampAnimals, validMetals } from "@/lib/api/types";

export function validateStamp(stamp: unknown) {
  // Missing stamp
  if (!stamp || typeof stamp !== "object") {
    return { valid: false, reason: "STAMP_MISSING" };
  }

  const parsedStamp = stamp as Record<string, unknown>;

  // Validate animal
  if (
    !parsedStamp.animal ||
    !stampAnimals.includes(parsedStamp.animal as any)
  ) {
    return { valid: false, reason: "STAMP_INVALID" };
  }

  // Validate metal (if exists)
  if (parsedStamp.metal && !validMetals.includes(parsedStamp.metal as any)) {
    return { valid: false, reason: "STAMP_INVALID" };
  }

  return { valid: true as const };
}
