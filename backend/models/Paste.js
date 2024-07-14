import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Paste = mongoose.model("Paste", pasteSchema);

export default Paste;
