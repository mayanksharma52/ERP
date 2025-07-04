const User=require('../models/User')
exports.getEmployeeProfile = async(req, res) => {
    try{
        const userId=req.user.id;
        const employee=await User.findById(userId).select('-password -otp -verified -__v');
        if(!employee){
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            })
        }
        return res.status(200).json({
            success: true,
            data: employee
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error:err.message
        })
    }
}