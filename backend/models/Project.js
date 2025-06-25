const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    deadline: { type: Date },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
