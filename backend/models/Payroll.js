const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    month: {
        type: String, // Format: "July 2025" or "2025-07"
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    bonus: {
        type: Number,
        default: 0,
    },
    deductions: {
        type: Number,
        default: 0,
    },
    netPay: {
        type: Number,
        required: true,
    },
    generatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Payroll', payrollSchema);