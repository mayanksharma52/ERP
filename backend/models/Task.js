const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }, // Reference to Project

    title: {
        type: String,
        required: true
    }, // Task title

    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    }, // Task status

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, // Assigned employee reference

    assignedName: {
        type: String,
        required: true
    }, // Assigned employee's name (copied from User)

    assignedEmail: {
        type: String,
        required: true
    }, // Assigned employee's email (copied from User)

    dueDate: {
        type: Date,
        default: null
    } // Optional due date
});

module.exports = mongoose.model('Task', taskSchema);