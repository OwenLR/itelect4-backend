import type { Types } from "mongoose";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "security_admin";
  isActive: boolean;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  location: string;
  datePosted: Date;
  type: "lost" | "found";
}

export interface Claim {
  id: number;
  itemId: number;
  claimantId: number;
  contactEmail: string;
  status: ClaimStatus;
  submittedAt: Date;
}

export enum ClaimStatus {
  Pending,
  UnderReview,
  Approved,
  Rejected,
}

export type UserDoc = Omit<User, "id"> & {
  password: string;
};

export type ClaimDoc = Omit<Claim, "id" | "claimantId"> & {
  claimantId: Types.ObjectId;
};

export type NewClaimBody = Pick<Claim, "itemId" | "contactEmail">;