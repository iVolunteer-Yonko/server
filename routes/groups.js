const express = require("express");
const router = express.Router();
const Group = require("../models/Group");
const auth = require("../middleware/auth");

router.post("/chat", auth, async (req, res) => {
  try {
    const { name, members } = req.body;
    const group = new Group({
      name,
      members: [...members, req.user._id],
      admin: req.user._id,
    });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/chat", auth, async (req, res) => {
  try {
    const groups = await Group.find({
      members: req.user._id,
    }).populate("members admin");
    res.json(groups);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
