import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import lostItemRoutes from "./src/routes/lostItem.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const corsConfig={
  credentials: "true",
  origin: "http://localhost:3000",
  optionSuccessStatus: "200",
};


app.use(cors(corsConfig));

app.use(morgan("tiny"));

// Use the authRoutes
app.use("/lostItem", lostItemRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Start the server

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
