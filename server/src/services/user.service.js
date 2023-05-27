const User = require('../models/user.model')
const userRepository = require('../repository/user.repository')

const findUserByEmail = async (email) => {
    const userData = await User.findOne({ email }).select({ email: 1, name: 1, isBlocked: 1, password: 1 })
    return userData
}

const findUserByToken = async (token) => {
    const userData = User.findOne({ token }).select({ email: 1, name: 1, isBlocked: 1 })
    return userData
}

const addRefreshTokenById = async (_id, token) => {
    await User.updateOne({ _id }, { $push: { token } })
}

const checkEmailExists = async (email) => {
    const isEmailTaken = await User.findOne({ email })
    if (isEmailTaken) {
        return true
    } else {
        return false
    }
}

const checkPhoneExists = async (phone) => {
    const isPhoneTaken = await User.findOne({ phone })
    if (isPhoneTaken) {
        return true
    } else {
        return false
    }
}

const checkTokenAndDelete = async (token) => {
    const isTokenPresent = User.findOneAndUpdate({ token }, { $pull: { token } })
    if (isTokenPresent) {
        return true
    } else {
        return false
    }
}

const isEnrolledForCourse = async ({ courseId, userId }) => {
    const userData = await userRepository.findUserByCourseId({ courseId, userId })
    if (userData) {
        return true
    }
    return false
}

const getAllUsers = async () => {
    const users = await userRepository.getAllUsers()
    return users
}



module.exports = {
    findUserByEmail, findUserByToken, getAllUsers,
    addRefreshTokenById,
    isEnrolledForCourse,
    checkEmailExists, checkPhoneExists, checkTokenAndDelete
}

