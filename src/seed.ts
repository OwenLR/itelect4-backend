import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import { Item } from "./models/Item";
import { ITEMS } from "./data/items";

// npm run seed. Run it once after the database is created, and again

// after anything that empties it. Nothing else in the project writes

// a course.
async function seed() {
  await connectDB();

  for (const item of ITEMS) {

    await Item.updateOne({ title: item.title }, item, { upsert: true });
  }

  console.log(`${ITEMS.length} items in ${mongoose.connection.name}`);

  await mongoose.disconnect();
}

seed().catch((err: unknown) => {
  console.error("Seed failed:", err);
  process.exit(1);
});