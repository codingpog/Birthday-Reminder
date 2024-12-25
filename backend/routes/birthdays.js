const express = require("express");
const Birthday = require("../models/Birthday");
const router = express.Router();

// POST /birthdays - Add a new birthday
router.post("/", async (req, res) => {
  try {
    const { name, date, userId } = req.body;
    const newBirthday = new Birthday({ name, date, userId });
    await newBirthday.save();
    res.status(201).json(newBirthday);
  } catch (error) {
    res.status(500).json({ message: "Error adding birthday" });
  }
});

// GET /birthdays - Get all birthdays
router.get("/", async (req, res) => {
  try {
    const birthdays = await Birthday.find();
    res.json(birthdays);
  } catch (error) {
    res.status(500).json({ message: "Error fetching birthdays" });
  }
});

// PUT /birthdays/:id - Update a birthday
router.put("/:id", async (req, res) => {
  try {
    const updatedBirthday = await Birthday.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBirthday);
  } catch (error) {
    res.status(500).json({ message: "Error updating birthday" });
  }
});

// DELETE /birthdays/:id - Delete a birthday
router.delete("/:id", async (req, res) => {
  try {
    await Birthday.findByIdAndDelete(req.params.id);
    res.json({ message: "Birthday deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting birthday" });
  }
});

module.exports = router;
