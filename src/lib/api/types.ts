// Possible stamps from Centralbank:
export type StampAnimal = "lion" | "dolphin" | "toucan" | "beetlebug" | "snake";

export const stampAnimals: StampAnimal[] = [
  "lion",
  "dolphin",
  "toucan",
  "beetlebug",
  "snake",
];

// For backend
export interface StampType {
  id: number;
  animal: StampAnimal;
  metal?: "silver" | "gold" | "platinum" | null;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

// For backend
export interface Stamp {
  id: number;
  user_id: number;
  stamptype_id: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  stamptype: StampType;
}

export const validMetals = ["silver", "gold", "platinum"] as const;

// Response from POST /transactions
export interface TransactionResponse {
  id: number;
  stamp: Stamp;
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

// Frontend stamp
export interface ParadeStamp {
  animal: StampAnimal;
  metal?: "silver" | "gold" | "platinum";
  image_url?: string;
}
