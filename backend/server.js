const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authMiddleware = require("./middlewares/auth"); // Import the auth middleware
const birthdaysRouter = require("./routes/birthdays");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/birthdays", birthdaysRouter);

// Test route for Firebase authentication
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: `Hello, ${req.user.name || "User"}` });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
