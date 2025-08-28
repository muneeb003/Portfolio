import express from "express";
import authRoutes from "./authRoutes.js";
import contentRoute from "./contentRoute.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/content", contentRoute);

export default router;
