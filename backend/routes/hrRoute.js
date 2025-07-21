const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const {
        getHrProfile,
        getAllEmployee,
        getSingleEmployee,
        addEmployee,
        updateEmployee,
        deleteUser,
        getAllAttendance,
        getAllLeaveRequests,
        updateLeaveStatus,
        assignProject,
        assignTask
} = require('../controllers/hr-controller');

// ✅ HR Profile
router.get(
    '/profile',
    authMiddleware,
    roleMiddleware(['hr']),
    getHrProfile
);

// ✅ Employee Management
router.get(
    '/employees',
    authMiddleware,
    roleMiddleware(['hr']),
    getAllEmployee
);

router.get(
    '/employees/:email',
    authMiddleware,
    roleMiddleware(['hr']),
    getSingleEmployee
);

router.post(
    '/addEmployee',
    authMiddleware,
    roleMiddleware(['hr']),
    addEmployee
);

router.put(
    '/updateEmployee/:email',
    authMiddleware,
    roleMiddleware(['hr']),
    updateEmployee
);

router.delete(
    '/deleteEmployee/:email',
    authMiddleware,
    roleMiddleware(['hr']),
    deleteUser
);

// ✅ Attendance
router.get(
    '/attendance',
    authMiddleware,
    roleMiddleware(['hr']),
    getAllAttendance
);

// ✅ Leave Approval
router.get(
    '/leaves',
    authMiddleware,
    roleMiddleware(['hr']),
    getAllLeaveRequests
);

router.put(
    '/leaves/:id',
    authMiddleware,
    roleMiddleware(['hr']),
    updateLeaveStatus
);

// ✅ Assign Project
router.post(
    '/assignProject',
    authMiddleware,
    roleMiddleware(['hr']),
    assignProject
);

// ✅ Assign Task
router.post(
    '/assignTask',
    authMiddleware,
    roleMiddleware(['hr']),
    assignTask
);

module.exports = router;