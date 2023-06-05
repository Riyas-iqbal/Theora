const userService = require('../services/user.service')
const AppError = require('../utils/app.error.util')
const asyncHandler = require('../utils/async.handler.util')
const objectIdSchema = require('../validation/id.validator')
const userDetailsSchema = require('../validation/user.details.validator')

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

const blockUser = async (req, res) => {
    const isBlocked = await userService.blockUser(req.body.userId)
    return res.status(200).json({ message: 'User Blocked successfully' })
}

const unblockUser = async (req, res) => {
    const isBlocked = await userService.unblockUser(req.body.userId)
    return res.status(200).json({ message: 'User unblocked successfully' })
}

const getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers()
    return res.status(200).json({ message: 'users found', data: users })
}

const getUserDetails = asyncHandler(async (req, res) => {
    const { value, errors } = objectIdSchema.validate(req.user?._id)
    console.log(errors)
    console.log(req.user)
    console.log(value)
    const userDetails = await userService.getUserDetails(value)

    return res.status(200).json({ message: 'user details found', userDetails })
})

const updateUserDetails = asyncHandler(async (req, res) => {
    console.log(req.body)

    const { value, error } = userDetailsSchema.validate(req.body)
    if (error) {
        throw AppError.validation(error.details[0].message)
    }

    const userData = await userService.updateUserDetails({...value,_id:req.user._id})

    res.status(200).json({message:'User details updated successfully',data: userData})
})

module.exports = {
    checkCourseEnrolled,
    getAllUsers,
    blockUser,
    unblockUser,
    getUserDetails,
    updateUserDetails
}