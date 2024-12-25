const mongoose = require("mongoose");

const birthdaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  userId: { type: String, required: true }, // To link each birthday entry to a specific user
});

module.exports = mongoose.model("Birthday", birthdaySchema);
