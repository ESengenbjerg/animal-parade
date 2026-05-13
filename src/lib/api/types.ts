// Possible stamps from Centralbank:
export type StampAnimal = "lion" | "dolphin" | "toucan" | "beetlebug" | "snake";

export const stampAnimals: StampAnimal[] = [
  "lion",
  "dolphin",
  "toucan",
  "beetlebug",
  "snake",
];

export interface Stamp {
  animal: StampAnimal;
  metal?: "silver" | "gold" | "platinum";
  image_url?: string;
}

export const validMetals = ["silver", "gold", "platinum"] as const;

// Response from POST /transactions
export interface TransactionResponse {
  id: string; // transaction ID
  stamp: Stamp; // Received stamp
}

// Error from API
export interface ApiError {
  message: string;
  status?: number;
}

// Parade animals:
export type Animals = "lion" | "zebra" | "peacock" | "penguin" | "turtle";

export const paradeAnimals = [
  "lion",
  "zebra",
  "peacock",
  "penguin",
  "turtle",
] as const;

export type Animal = (typeof paradeAnimals)[number];

// Decides duration on the animals animation
export const animalSpeed: Record<Animal, number> = {
  lion: 5000,
  zebra: 10000,
  peacock: 30000,
  penguin: 60000,
  turtle: 120000,
};
