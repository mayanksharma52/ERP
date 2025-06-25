const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: { type: String, required: true }, // e.g. "June 2025"
    baseSalary: { type: Number, required: true },
    deductions: { type: Number, default: 0 },
    bonuses: { type: Number, default: 0 },
    netPay: { type: Number },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payroll", payrollSchema);
