const Paste = require("../models/Paste");
const { nanoid } = require("nanoid");

exports.createPaste = async (req, res) => {
  const { content } = req.body;
  const url = nanoid();

  const newPaste = new Paste({
    content,
    url,
  });

  try {
    await newPaste.save();
    res.status(201).json(newPaste);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getPaste = async (req, res) => {
  try {
    const paste = await Paste.findOne({ url: req.params.url });
    if (!paste) {
      return res.status(404).json({ error: "Paste not found" });
    }
    res.json(paste);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
