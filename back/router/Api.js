import express from "express";
import { ReelsData, ReelsUpdate } from "../controller/api.js";
const router = express.Router()

router.post("/reels", ReelsData)
router.post("/reels/edit", ReelsUpdate)

export default router
