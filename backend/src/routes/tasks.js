const express = require("express");
const Task = require("../models/task");

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ position: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Add a new task
router.post("/", async (req, res) => {
  const { task } = req.body;
  const newTask = new Task({ task, completed: false });

  try {
    const savedTask = await newTask.save();
    res.status(201).json({ message: "Task added successfully", taskId: savedTask._id });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Task.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { task }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Toggle task completion
router.put("/completed/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task completion status updated" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Search task by name
router.get("/search/:task", async (req, res) => {
  const { task } = req.params;

  try {
    const tasks = await Task.find({ task: { $regex: task, $options: "i" } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Update task order
router.put("/reorder", async (req, res) => {
  const { tasks } = req.body;

  const updatePromises = tasks.map((task, index) => {
    return Task.findByIdAndUpdate(task.id, { position: index });
  });

  try {
    await Promise.all(updatePromises);
    res.json({ message: "Task order updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error });
  }
});

module.exports = router;