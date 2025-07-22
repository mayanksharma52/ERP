const {User,Attendance,Leave,Payroll,Project,Task}=require('../models/Allmodels');

//edit profile
// exports.editProfile=async(req,res)=>{
//     try{
//         const profile=req.body;
//         const userId=req.user.id;
//         const user=await User.findById(userId);
//         if(!user){
//             return res.status(404).json({success:false,message:"User not found"});
//         }
//         profile.name=user.name;
//         user.email=profile.email;
//         user.phone=profile.phone;
//         user.address=profile.address;
//     }
// }
// controllers/employeeController.js

exports.markAttendance = async (req, res) => {
    try {
        const userId = req.user.id; // ✅ user ID from token
        const today = new Date().toISOString().split('T')[0];

        // ✅ Check if attendance already marked for today
        const existing = await Attendance.findOne({ userId,date:today });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Attendance already marked for today',
            });
        }

        // ✅ Fetch user name and email
        const user = await User.findById(userId).select('name email');
        if (!user || !user.email) {
            return res.status(404).json({
                success: false,
                message: 'User not found or missing email',
            });
        }

        // ✅ Create new attendance record
        const newRecord = new Attendance({
            userId,
            name: user.name,
            email: user.email, // Must match schema field
            date: today,
            status: 'Present',
            checkIn: new Date().toLocaleTimeString('en-IN', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
        });

        await newRecord.save();

        return res.status(201).json({
            success: true,
            message: 'Attendance marked successfully',
            data: newRecord,
        });
    } catch (err) {
        console.error('Attendance marking error:', err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
};

exports.getOwnAttendance = async (req, res) => {
    try {
        const userId = req.user.id; // ✅ From JWT middleware

        const attendanceRecords = await Attendance.find({ userId }).sort({ date: -1 });

        return res.status(200).json({
            success: true,
            message: 'Attendance fetched successfully',
            data: attendanceRecords,
        });
    } catch (err) {
        console.error('Error fetching attendance:', err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
};



exports.applyLeave = async (req, res) => {
    try {
        const userId = req.user.id;
        const userName = req.user.name;
        const userEmail = req.user.email;
        const { reason, fromDate, toDate } = req.body;

        if (!reason || !fromDate || !toDate) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const leave = new Leave({
            userId,
            name: userName,
            email: userEmail,
            reason,
            fromDate,
            toDate,
        });

        await leave.save();

        return res.status(201).json({
            success: true,
            message: 'Leave applied successfully',
            data: leave,
        });
    } catch (err) {
        console.error('Leave apply error:', err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
};


exports.getOwnPayroll = async (req, res) => {
    try {
        const userId = req.user.id;

        const payrollRecords = await Payroll.find({ userId }).sort({ generatedAt: -1 });

        return res.status(200).json({
            success: true,
            message: 'Payroll data fetched successfully',
            data: payrollRecords,
        });
    } catch (err) {
        console.error('Payroll fetch error:', err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
};

const mongoose = require('mongoose');

exports.getOwnProjectsAndTasks = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch all projects assigned to the user
        const projects = await Project.find({ userId });

        // For each project, fetch its tasks
        const projectsWithTasks = await Promise.all(
            projects.map(async (project) => {
                const tasks = await Task.find({
                    projectId: new mongoose.Types.ObjectId(project._id)  // ✅ Ensure type matches
                });
                return {
                    project,
                    tasks
                };
            })
        );

        return res.status(200).json({
            success: true,
            message: 'Projects and tasks fetched successfully',
            data: projectsWithTasks,
        });

    } catch (err) {
        console.error('getOwnProjectsAndTasks error:', err);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};