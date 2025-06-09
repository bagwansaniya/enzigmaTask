const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const db = require("./utils/db"); // This will connect automatically

const app = express();
const port = process.env.PORT || 8625;

// CORS middleware FIRST
app.use(
  cors({
    origin: "https://enzigma-task-726k.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Explicitly handle preflight requests
app.options("*", cors());

// Then JSON middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
