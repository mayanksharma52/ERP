const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const { getOwnAttendance, markAttendance, applyLeave, getOwnPayroll, getOwnProjectsAndTasks} = require('../controllers/employee-controller');

// ✅ Route for employee to view their own attendance
router.get(
    '/attendance/view',
    authMiddleware,
    roleMiddleware(['employee']),
    getOwnAttendance
);

router.post(
    '/attendance/mark',
    authMiddleware,
    roleMiddleware(['employee']),
    markAttendance

);
router.post(
    '/apply/leave',
    authMiddleware,
    roleMiddleware(['employee']),
    applyLeave

);


router.get('/payroll/me',
    authMiddleware,
    roleMiddleware(['employee']),
    getOwnPayroll
);
router.get('/projects/my-tasks',
    authMiddleware,
    roleMiddleware(['employee']),
    getOwnProjectsAndTasks
);

module.exports = router;