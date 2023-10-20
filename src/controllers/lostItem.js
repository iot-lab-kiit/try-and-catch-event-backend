import { LostItem } from "../models/lostItem.js";
export const addLostItem = async (req, res, next) => {
  try {
    const lostItem = new LostItem(req.body);
    const savedLostItem = await lostItem.save();

    res
      .status(200)
      .json({ message: "Lost item added successfully", savedLostItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getByCategory = async (req, res, next) => {
  try {
    const category = req.query.category; // Get the category from the query string

    if (!category || (category !== "LOST" && category !== "FOUND")) {
      return res.status(400).json({ message: "Invalid category provided" });
    }

    const lostItems = await LostItem.find({ category });

    return res.status(200).json(lostItems);
  } catch (error) {
    console.error("Error fetching lost items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const claimLostItem = async (req, res, next) => {
  try {
    const id = req.query.id
    const lostItem = await LostItem.findById(id);
    if (lostItem.category === 'FOUND') {
      return res.status(402).json({message: "Item has already been claimed"});
    }

    await lostItem.updateOne({_id: id}, {category: "FOUND"})
    return res.status(200).json({message: "Item has been claimed"});
  } catch (error) {
    console.error("Error claiming lost item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
