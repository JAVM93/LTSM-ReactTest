import express from "express";
import { createReport, getFeedReport, getUserReport} from "../controllers/report.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/",  getFeedReport);
router.post("/createReport",  createReport);
router.get("/:userId/report",  getUserReport);

/* /* UPDATE /
router.patch("/:id/like", verifyToken, likePost); */

export default router; 
