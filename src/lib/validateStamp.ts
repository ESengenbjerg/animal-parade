import { stampAnimals, validMetals } from "@/lib/api/types";

export function validateStamp(stamp: any) {
  if (!stamp) return { valid: false, reason: "STAMP_MISSING" };

  if (!stamp.animal || !stampAnimals.includes(stamp.animal)) {
    return { valid: false, reason: "STAMP_INVALID" };
  }

  if (stamp.metal && !validMetals.includes(stamp.metal)) {
    return { valid: false, reason: "STAMP_INVALID" };
  }

  return { valid: true };
}
