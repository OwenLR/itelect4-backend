import { Router, type Request, type Response } from "express";
import { Claim } from "../models/Claim";
import { requireAuth } from "../middleware/auth";
import type { NewClaimBody } from "../types/index";

export const claimRouter = Router();

claimRouter.use(requireAuth);

interface IdParam {
  id: string;
}

// GET /api/claims -- only the ones belonging to this token
claimRouter.get("/", async (req: Request, res: Response) => {
  const claims = await Claim.find({
    claimantId: req.userId,
  }).sort({ submittedAt: -1 });
  res.json(claims);
});

// GET /api/claims/:id
claimRouter.get(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const claim = await Claim.findOne({
      _id: req.params.id,
      claimantId: req.userId,
    });

    if (!claim) {
      res.status(404).json({ message: "No claim with that id" });
      return;
    }

    res.json(claim);
  },
);

// POST /api/claims
claimRouter.post(
  "/",
  async (
    req: Request<unknown, unknown, NewClaimBody>,
    res: Response,
  ) => {
    const claim = await Claim.create({
      ...req.body,
      claimantId: req.userId,
    });

    res.status(201).json(claim);
  },
);

// PATCH /api/claims/:id
claimRouter.patch(
  "/:id",
  async (
    req: Request<IdParam, unknown, Partial<NewClaimBody>>,
    res: Response,
  ) => {
    const claim = await Claim.findOneAndUpdate(
      { _id: req.params.id, claimantId: req.userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!claim) {
      res.status(404).json({ message: "No claim with that id" });
      return;
    }

    res.json(claim);
  },
);

// DELETE /api/claims/:id
claimRouter.delete(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const claim = await Claim.findOneAndDelete({
      _id: req.params.id,
      claimantId: req.userId,
    });

    if (!claim) {
      res.status(404).json({ message: "No claim with that id" });
      return;
    }

    res.status(204).send();
  },
);