const mongoose = require('mongoose')
const User = require('../models/user.model')
const AppError = require('../utils/app.error.util')


const findUserByEmail = async (email) => {
    const userData = await User.findOne({ email }).select({ email: 1, name: 1, isBlocked: 1, password: 1 })
    return userData
}

const findUserByPhone = async (phone) => {
    const userData = await User.findOne({ phone })
    return userData
}

const findUserByToken = async (token) => {
    const userData = User.findOne({ token }).select({ email: 1, name: 1, isBlocked: 1 })
    return userData
}

const createUser = ({ name, password, phone, email }) => {
    const user = new User({
        name,
        email,
        phone,
        password
    })

    return user.save()
        .then(response => response)
        .catch(error => {
            console.log('Error saving user data to database - ', error)
            throw new AppError.database('An error occured while processing your data')
        })
}

const addRefreshTokenById = async (_id, token) => {
    await User.updateOne({ _id }, { $push: { token } })
}

const findByTokenAndDelete = async (token) => {
    const isTokenPresent = await User.findOneAndUpdate({ token }, { $pull: { token } })
    return isTokenPresent
}

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
    console.log(coursesEnrolled)
    return coursesEnrolled[0].details
}

const getEnrolledCountById = async (courseId) => {
    const enrolledStudents = await User.countDocuments({ enrolledCourses: {$in : [courseId]} }) 
    console.log(enrolledStudents)
    return enrolledStudents
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
    createUser,
    getCoursesEnrolled,
    findUserByCourseId,
    addRefreshTokenById,
    findUserByEmail,
    findUserByPhone,
    findUserByToken,
    findByTokenAndDelete,
    getEnrolledCountById
}