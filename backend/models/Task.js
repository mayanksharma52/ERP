const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    title: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
