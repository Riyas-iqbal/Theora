const tutorService = require('../services/tutor.service')

const getTopTutors = async (req,res) => {
    const topTutors = await  tutorService.getTopTutors()
    return res.status(200).json({
        message:'Top tutors found',
        data: topTutors
    })
}


module.exports = {
    getTopTutors
}