import { nanoid } from "nanoid";
import Paste from "../models/Paste.js";

export const createPaste = async (req, res) => {
  try {
    const { content } = req.body;
    const url = nanoid(10);
    const newPaste = new Paste({ url, content });
    await newPaste.save();
    res.status(201).json({ url });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getPaste = async (req, res) => {
  try {
    const { url } = req.params;
    const paste = await Paste.findOne({ url });
    if (paste) {
      res.status(200).json(paste);
    } else {
      res.status(404).json({ message: "Paste not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
