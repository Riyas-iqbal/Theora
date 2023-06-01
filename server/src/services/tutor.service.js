const Tutor = require('../models/tutor.model')
const tutorRepository = require('../repository/tutor.repository')

const findTutorByEmail = async (email) => {
    let tutorData = await Tutor.findOne({ email }).select({ email: 1, name: 1, isBlocked: 1, password: 1 })
    return tutorData
}

// const findTutorByToken = async (token) => {

// }

const getTopTutors = async () => {
    const limit = 5
    const topTutors = await tutorRepository.getTutors(limit)
    return topTutors 
} 

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

const getAllTutors = async () => {
    const users = await tutorRepository.getAllTutors()
    return users
}

const blockTutor = async (userId) => {
    const isBlocked = await tutorRepository.blockTutorById(userId)
    return isBlocked
}

const unblockTutor = async (userId) => {
    const isBlocked = await tutorRepository.unblockTutorById(userId)
    return isBlocked
}

module.exports = {
    findTutorByEmail,getTopTutors,
    addRefreshTokenById,
    checkEmailExists, checkPhoneExists, checkTokenAndDelete,
    getAllTutors, blockTutor, unblockTutor
}