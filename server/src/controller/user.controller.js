const userService = require('../services/user.service')

//check if user is enrolled in a course by passing couresId and userId
const checkCourseEnrolled = async (req, res) => {

    if (!req.user) {
        return res.status(200)
            .json({
                message: 'user is not logged in',
                enrolled: false
            })
    }

    const params = {
        courseId: req.params.id,
        userId: req.user._id
    }

    const isEnrolled = await userService.isEnrolledForCourse(params)

    return res.status(200).json({
        message: isEnrolled ? 'user is already enrolled for this course' : 'user is not enrolled for this course',
        enrolled: isEnrolled
    })
}

const blockUser = async (req,res) => {
    const isBlocked = await userService.blockUser(req.body.userId)
    return res.status(200).json({message:'User Blocked successfully'})
}

const unblockUser = async (req,res) => {
    const isBlocked = await userService.unblockUser(req.body.userId)
    return res.status(200).json({message:'User unblocked successfully'})
}

const getAllUsers = async(req,res)=>{
    const users = await userService.getAllUsers()
    return res.status(200).json({message:'users found',data:users}) 
}

module.exports = {
    checkCourseEnrolled,
    getAllUsers,
    blockUser,
    unblockUser
}