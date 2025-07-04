const express=require('express');
const router=express.Router();
const {authMiddleware,roleMiddleware}=require('../middleware/authMiddleware');
const {getEmployeeProfile}=require('../controllers/employee-controller');

router.get(
    '/profile',
    authMiddleware,
    roleMiddleware(['employee']),
    getEmployeeProfile
);

module.exports=router;