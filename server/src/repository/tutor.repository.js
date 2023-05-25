const Tutor = require('../models/tutor.model')

const getTutors = async (limit) => {
    const topTutors = await Tutor.find({}).limit(limit).select('name email')
    return topTutors
}

module.exports = {
    getTutors
}