const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    fromDate: {
        type: String, // or Date
        required: true,
    },
    toDate: {
        type: String, // or Date
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Leave', leaveSchema);