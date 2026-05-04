import { Router, Request, Response } from "express";
import { users } from "../data/seed";
import { ApiResponse, User } from "../types";

const router = Router();

// GET /api/users — list all available users
router.get("/", (_req: Request, res: Response<ApiResponse<User[]>>) => {
  res.json({ success: true, data: users });
});

export default router;
