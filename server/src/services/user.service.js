const User = require('../models/user.model')

const findUserByEmail = async (email) => {
    const userData = await User.findOne({ email: value.email }).select({ email: 1, name: 1, isBlocked: 1, password: 1 })
    return userData
}

const findUserByToken = async (token) => {
    const userData = User.findOne({ token: refreshToken }).select({ email: 1, name: 1, isBlocked: 1 })
    return userData
}

const addRefreshTokenById = async (_id, refreshToken) => {
    await User.updateOne({ _id }, { $push: { token: refreshToken } })
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



module.exports = {
    findUserByEmail, findUserByToken,
    addRefreshTokenById,
    checkEmailExists, checkPhoneExists, checkTokenAndDelete
}

