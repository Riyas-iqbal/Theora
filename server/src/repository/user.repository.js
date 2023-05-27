const mongoose = require('mongoose')
const User = require('../models/user.model')


const enrollInCourseById = async ({ courseId, userId }) => {
    const userData = await User.updateOne({ _id: userId }, { $addToSet: { enrolledCourses: courseId } })
    console.log(userData)
    return userData
}

const getCoursesEnrolled = async (userId) => {
    const coursesEnrolled = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(userId) } },
        { $project: { enrolledCourses: 1, _id: 0 } },
        {
            $lookup: {
                from: 'courses',
                localField: 'enrolledCourses',
                foreignField: '_id',
                as: 'details'
            }
        },
        { $project: { details: 1 } }
    ])
    return coursesEnrolled[0].details
}

const findUserByCourseId = async ({ courseId, userId }) => {
    
    const userData = await User.findOne({ _id: userId, enrolledCourses: { $in: [courseId] } })
    return userData
}


const getAllUsers = async (arg) => {
    const users = await User.find()
    return users 
}
module.exports = {
    enrollInCourseById,
    getAllUsers,
    getCoursesEnrolled,
    findUserByCourseId
}