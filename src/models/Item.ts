import { Schema, model } from "mongoose";
import type { ItemDoc } from "../types/index";

const itemSchema = new Schema<ItemDoc>({
  title: { type: String, required: [true, "title is required"], trim: true },
  description: {
    type: String,
    required: [true, "description is required"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "location is required"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "type is required"],
    enum: {
      values: ["lost", "found"],
      message: "type must be lost or found",
    },
  },
  datePosted: { type: Date, default: Date.now },
});

itemSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Item = model<ItemDoc>("Item", itemSchema);