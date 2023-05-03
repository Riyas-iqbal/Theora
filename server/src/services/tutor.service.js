const Tutor = require('../models/tutor.model')

const findTutorByEmail = async (email) => {
    let tutorData = await Tutor.findOne({ email }).select({ email: 1, name: 1, isBlocked: 1, password: 1 })
    return tutorData
}

// const findTutorByToken = async (token) => {

// }

const addRefreshTokenById = async (_id,refreshToken) => {
    await Tutor.updateOne({ _id }, { $push: { token: refreshToken } })
}

const checkEmailExists = async (email) => {
    const isEmailTaken = await Tutor.findOne({ email })
    if (isEmailTaken) {
        return true
    } else {
        return false
    }
}

const checkPhoneExists = async (phone) => {
    const isPhoneTaken = await Tutor.findOne({ phone })
    if (isPhoneTaken) {
        return true
    } else {
        return false
    }
}

const checkTokenAndDelete = async (token) => {
    const isTokenPresent = Tutor.findOneAndUpdate({ token }, { $pull: { token } })
    if (isTokenPresent) {
        return true
    } else {
        return false
    }
}





module.exports = {
    findTutorByEmail,
    addRefreshTokenById,
    checkEmailExists, checkPhoneExists, checkTokenAndDelete
}