const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const db = require("./utils/db"); // This will connect automatically

const app = express();
const port = process.env.PORT || 8625;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://enzigma-task-726k.vercel.app",
    credentials: true, // if you use cookies or authentication headers
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
