import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import pasteRoutes from "./routes/pasteRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(express.json());

app.use("/api/pastes", pasteRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
