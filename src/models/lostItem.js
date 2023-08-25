import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    studentName: { type: String, required: true },
    itemTitle: { type: String, required: true },
    itemDescription: { type: String, required: true },
    email: { type: String, required: true },
    lostLocation: { type: String, required: true },
    category: {
      type: String,
      enum: ["LOST", "FOUND"],
      required: true,
    },
  },
  { timestamps: true }
);

export const LostItem = mongoose.model("LostItem", lostItemSchema);
