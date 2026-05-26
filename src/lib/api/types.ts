// ----- TYPES FROM API -----
// Possible stamps from Centralbank:
export type StampAnimal = "lion" | "dolphin" | "toucan" | "beetlebug" | "snake";

export const stampAnimals: StampAnimal[] = [
  "lion",
  "dolphin",
  "toucan",
  "beetlebug",
  "snake",
];

// Meta data for stamp types from API:
export interface StampType {
  id: number;
  animal: StampAnimal;
  metal?: "silver" | "gold" | "platinum" | null;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Stamp the user receives from API
export interface Stamp {
  id: number;
  user_id: number;
  stamptype_id: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  stamptype: StampType;
}

// Stamp in response from API
export interface ApiStamp {
  animal: StampAnimal;
  metal: "silver" | "gold" | "platinum" | null;
  image_url: string;
}

// Metals allowed by API
export const validMetals = ["silver", "gold", "platinum"] as const;

// Response from /transactions
export interface TransactionResponse {
  transaction_id: number;
  amount: number;
  stamp: ApiStamp | null;
}

// Error from API
export interface ApiError {
  message: string;
  status?: number;
}

// ----- ANIMAL PARADE TYPES -----
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

// Decides height of animal in animation
export const animalHeight: Record<Animal, string> = {
  lion: "22vh",
  zebra: "24vh",
  peacock: "20vh",
  penguin: "18vh",
  turtle: "16vh",
};

// Animal facts
export const animalFacts: Record<Animal, string[]> = {
  lion: [
    "Lions can nap up to 20 hours a day. Respect.",
    "A lion's roar can be heard from 8 km away.",
    "Lions don't chase prey for long - they prefer ambush.",
    "Male lions actually do less hunting than females.",
    "A lion can sprint 80 km/h… for about 3 seconds.",
  ],
  zebra: [
    "No two zebras have the same stripe pattern.",
    "Zebras can sleep standing up. Efficiency king.",
    "A zebra's kick can break a lion's jaw.",
    "Zebras are surprisingly good swimmers.",
    "Their stripes confuse predators during motion.",
  ],
  peacock: [
    "Peacocks are actually male - females are peahens.",
    "Their feathers aren't blue - it's light refraction.",
    "Peacocks can fly short distances despite the drama.",
    "They shake their feathers at 26 times per second.",
    "A peacock's tail can be 60% of its body length.",
  ],
  penguin: [
    "Penguins propose with pebbles. Romantic icons.",
    "They can drink saltwater thanks to special glands.",
    "Penguins can jump 2 meters straight up.",
    "They have knees - they're just hidden.",
    "Penguins mate for life (most of the time).",
  ],
  turtle: [
    "Turtles have existed longer than dinosaurs.",
    "Some turtles breathe through their butts. Yes.",
    "They can live over 100 years.",
    "Turtles are slow on land but fast in water.",
    "Their shells have nerve endings - they feel touch.",
  ],
};

// Frontend stamp (UI)
export interface ShowStamp {
  animal: StampAnimal;
  metal?: "silver" | "gold" | "platinum" | null;
  image_url?: string;
}
