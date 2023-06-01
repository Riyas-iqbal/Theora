const tutorService = require('../services/tutor.service')

const getTopTutors = async (req,res) => {
    const topTutors = await  tutorService.getTopTutors()
    return res.status(200).json({
        message:'Top tutors found',
        data: topTutors
    })
}

const getAllTutors = async (req,res) => {
    const tutors = await tutorService.getAllTutors()
    return res.status(200).json({message:'tutors found',data:tutors}) 
}

const blockTutor = async (req,res) => {
    const name = await tutorService.blockTutor(req.body.userId)
    return res.status(200).json({message:'User blocked successfully'})
}

const unblockTutor = async (req,res) => {
    const isBlocked = await tutorService.unblockTutor(req.body.userId)
    return res.status(200).json({message:'User unblocked successfully'})
}



module.exports = {
    getTopTutors,
    getAllTutors,
    blockTutor,
    unblockTutor
}