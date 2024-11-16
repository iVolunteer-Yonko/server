const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth");

router.post("/chat", auth, async (req, res) => {
  try {
    const { receiver, content, groupId } = req.body;
    const message = new Message({
      sender: req.user._id,
      receiver,
      content,
      groupId,
    });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/chat/private/:userId", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id },
      ],
    }).populate("sender receiver");
    res.json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/chat/group/:groupId", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      groupId: req.params.groupId,
    }).populate("sender");
    res.json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
