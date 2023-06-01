const Tutor = require('../models/tutor.model')

const getTutors = async (limit) => {
    const topTutors = await Tutor.find({}).limit(limit).select('name email')
    return topTutors
}

const getAllTutors = async () => {
    const users = await Tutor.find()
    return users
}

const blockTutorById = async (_id) => {
    const isBlocked = await Tutor.updateOne({ _id}, { isBlocked: true })
    return isBlocked 
}

const unblockTutorById = async (_id) => {
    const isBlocked = await Tutor.updateOne({ _id}, { isBlocked: false })
    return isBlocked 
}

module.exports = {
    getTutors,
    getAllTutors,
    blockTutorById,
    unblockTutorById
}