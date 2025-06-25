const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["admin", "employee", "hr", "manager"],
      default: "employee",
    },

    department: {
      type: String, // Or ObjectId if linking to a departments collection
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("User", userSchema);
