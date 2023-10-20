import express from "express";
import { addLostItem, getByCategory, claimLostItem } from "../controllers/lostItem.js";
const router = express.Router();

router.post("/addLostItem", addLostItem);
router.get("/getByCategory", getByCategory);
router.put("/claimLostItem", claimLostItem)

export default router;
