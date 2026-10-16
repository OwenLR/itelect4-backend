import type { ItemDoc } from "../types/index";

export const ITEMS: ItemDoc[] = [
  {
    title: "Black Backpack",
    description: "Left near the library entrance",
    location: "Main Library",
    datePosted: new Date("2026-08-01T09:00:00.000Z"),
    type: "found",
  },
  {
    title: "Blue Umbrella",
    description: "Forgotten in Room 301",
    location: "Engineering Building",
    datePosted: new Date("2026-08-05T09:00:00.000Z"),
    type: "lost",
  },
  {
    title: "Student ID Card",
    description: "Found near the canteen tables",
    location: "Canteen",
    datePosted: new Date("2026-08-10T09:00:00.000Z"),
    type: "found",
  },
];