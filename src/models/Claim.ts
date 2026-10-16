import { Schema, model } from "mongoose";
import type { ClaimDoc } from "../types/index";

const claimSchema = new Schema<ClaimDoc>({
  claimantId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  itemId: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: [true, "itemId is required"],
  },

  contactEmail: {
    type: String,
    required: [true, "contactEmail is required"],
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.edu(\.ph)?$/,
      "contactEmail must be a school email ending in .edu or .edu.ph",
    ],
  },

  status: {
    type: Number,
    enum: {
      values: [0, 1, 2, 3],
      message: "status must be 0, 1, 2 or 3",
    },
    default: 0,
  },

  submittedAt: { type: Date, default: Date.now },
});

claimSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Claim = model<ClaimDoc>("Claim", claimSchema);