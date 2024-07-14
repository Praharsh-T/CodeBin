import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import pasteRoutes from "./routes/pasteRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Parse incoming JSON data (only once)
app.use(express.json());

// Mount paste routes
app.use("/api/pastes", pasteRoutes);

// Error handling middleware (optional, but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).json({ message: "Server Error" }); // Send a generic error message to the client
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
