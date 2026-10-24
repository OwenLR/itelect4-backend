import "dotenv/config";
import { reviewClaim } from "./ai/gemini";

// npm run try-ai. One real request to Gemini from your terminal -- the
// same function POST /api/ai calls, with no Express, no token and no
// database.
async function tryAi() {
  const review = await reviewClaim(
    "A blue Hydro Flask water bottle with a dent near the bottom and a " +
      "sticker of a cat on the side. I think I left it in Room 301 of " +
      "the Engineering Building last Monday morning.",
  );
  console.log(JSON.stringify(review, null, 2));
}

tryAi().catch((err: unknown) => {
  console.error("Gemini call failed:", err);
  process.exit(1);
});