import { Router, type Request, type Response } from "express";
import { Item } from "../models/Item";

export const itemRouter = Router();

// No requireAuth in this file: the item list is what the site shows
// somebody who has not logged in, so these two routes are public.

// GET /api/items
itemRouter.get("/", async (_req: Request, res: Response) => {
  const items = await Item.find().sort({ datePosted: -1 });
  res.json(items);
});

interface IdParam {
  id: string;
}

// GET /api/items/:id
itemRouter.get(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const item = await Item.findById(req.params.id);

    if (!item) {
      res.status(404).json({
        message: `No item with id "${req.params.id}"`,
      });
      return;
    }

    res.json(item);
  },
);