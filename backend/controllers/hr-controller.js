const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');
const Payroll = require('../models/Payroll');
const Project = require('../models/Project');
const Task = require('../models/Task');

// Get HR profile
exports.getHrProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const employee = await User.findById(userId).select('-password -otp -verified -__v');
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        return res.status(200).json({ success: true, data: employee });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};

// Get all employees
exports.getAllEmployee = async (req, res) => {
    try {
        const employee = await User.find({ role: "employee" }).select('-password -otp -verified -__v');
        return res.status(200).json({ success: true, count: employee.length, data: employee });
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: e.message });
    }
};

// Get single employee by email
exports.getSingleEmployee = async (req, res) => {
    try {
        const email = req.params.email.toLowerCase();
        const employee = await User.findOne({ email, role: "employee" }).select("-password -otp -verified -__v");
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found with this email' });
        }
        return res.status(200).json({ success: true, data: employee });
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: e.message });
    }
};

// Add new employee
exports.addEmployee = async (req, res) => {
    try {
        const newUserData = req.body;
        newUserData.role = "employee";

        const existingUser = await User.findOne({ email: newUserData.email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const newUser = new User(newUserData);
        newUser.verified = true;
        await newUser.save();

        return res.status(201).json({ success: true, message: 'Employee added successfully' });
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: e.message });
    }
};

// Update employee by email
exports.updateEmployee = async (req, res) => {
    try {
        const email = req.params.email.toLowerCase();
        const updatedData = req.body;
        updatedData.role = 'employee';

        const employee = await User.findOneAndUpdate({ email }, updatedData, { new: true, runValidators: true })
            .select('-password -otp -verified -__v');

        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        return res.status(200).json({ success: true, message: 'Employee updated successfully', data: employee });
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: e.message });
    }
};

// Delete employee by email
exports.deleteUser = async (req, res) => {
    try {
        const email = req.params.email.toLowerCase();

        const deletedUser = await User.findOneAndDelete({ email, role: 'employee' });

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'Employee not found or already deleted' });
        }

        return res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: e.message });
    }
};

// ✅ NEW: Get all attendance records
exports.getAllAttendance = async (req, res) => {
    try {
        const records = await Attendance.find().sort({ date: -1 });
        return res.status(200).json({ success: true, data: records });
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: e.message });
    }
};

// ✅ NEW: Get all leave requests
exports.getAllLeaveRequests = async (req, res) => {
    try {
        const leaves = await Leave.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: leaves });
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: e.message });
    }
};

// ✅ NEW: Approve or reject a leave request
exports.updateLeaveStatus = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const { status } = req.body; // "Approved" or "Rejected"

        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const leave = await Leave.findByIdAndUpdate(leaveId, { status }, { new: true });
        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave request not found" });
        }

        return res.status(200).json({ success: true, message: "Leave status updated", data: leave });
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: e.message });
    }
};

// ✅ NEW: Assign project to employee
exports.assignProject = async (req, res) => {
    try {
        const { name, description, assignedTo } = req.body;

        // 🔍 Look up the employee by email
        const user = await User.findOne({ email: assignedTo });
        if (!user || user.role !== "employee") {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        // ✅ Create project with full user info
        const project = new Project({
            name,
            description,
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
        });

        await project.save();

        return res.status(201).json({
            success: true,
            message: "Project assigned successfully",
            data: project,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: e.message,
        });
    }
};

// ✅ NEW: Add task to employee
const mongoose = require('mongoose');

exports.assignTask = async (req, res) => {
    try {
        const { title, projectId, assignedTo, dueDate } = req.body;

        // Fetch the user by email
        const user = await User.findOne({ email: assignedTo });
        if (!user || user.role !== 'employee') {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        // Create the task with assigned user details
        const task = new Task({
            title,
            projectId: new mongoose.Types.ObjectId(projectId), // ✅ ensure correct ObjectId type
            assignedTo: user._id,
            assignedName: user.name,
            assignedEmail: user.email,
            dueDate,
        });

        await task.save();

        return res.status(201).json({ success: true, message: 'Task assigned successfully', data: task });
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: e.message });
    }
};