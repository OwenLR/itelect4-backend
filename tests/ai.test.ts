import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../src/app";

// app.ts waits for connectDB() in front of every route, and there is no
// database here or on GitHub's machine. This replaces the whole
// src/config/db module, for this test file only, with one whose
// connectDB does nothing.
vi.mock("../src/config/db", () => ({
  connectDB: async () => {},
}));

// A token made the way POST /api/auth/login makes one: the same payload
// shape, signed with the same JWT_SECRET.
function tokenFor(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "5m",
  });
}

describe("POST /api/ai", () => {
  it("answers 401 when there is no token", async () => {
    const res = await request(app)
      .post("/api/ai")
      .send({ prompt: "A blue umbrella with a wooden handle left in Room 301." });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe(
      "No token. Send Authorization: Bearer <token>",
    );
  });

  it("answers 401 when the token was signed with another secret", async () => {
    const forged = jwt.sign({ userId: "someone" }, "not-the-secret");

    const res = await request(app)
      .post("/api/ai")
      .set("Authorization", `Bearer ${forged}`)
      .send({ prompt: "A blue umbrella with a wooden handle left in Room 301." });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Token is invalid or has expired");
  });

  it("lets a valid token through, then checks the body", async () => {
    // "Too short" is 9 characters, so aiRequestSchema refuses it before
    // reviewClaim() runs -- Gemini is never called.
    const res = await request(app)
      .post("/api/ai")
      .set("Authorization", `Bearer ${tokenFor("test-user")}`)
      .send({ prompt: "Too short" });

    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual([
      "Describe the item in at least 20 characters.",
    ]);
  });
});