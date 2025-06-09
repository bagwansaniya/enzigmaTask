const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;