import express from "express";
import { addLostItem, getByCategory } from "../controllers/lostItem.js";
const router = express.Router();

router.post("/addLostItem", addLostItem);
router.get("/getByCategory", getByCategory);

export default router;
