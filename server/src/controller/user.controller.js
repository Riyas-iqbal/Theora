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

const getAllUsers = async(req,res)=>{
    const users = await userService.getAllUsers()
    return res.status(200).json({message:'users found',data:users}) 
}

module.exports = {
    checkCourseEnrolled,
    getAllUsers
}