import { z } from "zod";

// What a client is allowed to send to POST /api/ai. Checked before
// anything is sent to Gemini, because every request that reaches
// Gemini is counted against your free quota.
export const aiRequestSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Describe the item in at least 20 characters.")
    .max(2000, "Keep the description under 2000 characters."),
});

// What Gemini has to send BACK. Used three ways: z.infer (the Review
// type), z.toJSONSchema (sent to Gemini), safeParse (the check).
// .describe() travels to Gemini inside the JSON Schema.
export const reviewSchema = z.object({
  summary: z
    .string()
    .describe("One sentence restating what item the student describes."),
  strengths: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe("Details in the description that would help match the item."),
  improvements: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe("Concrete details to add before submitting the claim."),
  matchability: z
    .enum(["strong", "fair", "weak"])
    .describe("How easily security could match this description to a found item."),
});

export type Review = z.infer<typeof reviewSchema>;

// Computed once, when this file is first imported -- not per request.
export const reviewJsonSchema = z.toJSONSchema(reviewSchema);