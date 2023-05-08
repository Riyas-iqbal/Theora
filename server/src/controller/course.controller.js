
const getAllCourseByTutor = (req,res)=>{
    res.send('getAllCourseByTutor')
}

const getSpecificCourse = (req,res)=>{
    res.send('getSpecificCourse')
}

const createCourse = (req,res)=>{
    console.log(req.body)
    res.json({response:'ok'})
}

const updateCourse = (req,res)=>{
    res.send('udpateCourse')
}

const deleteCourse = (req,res)=>{
    res.send('deleteCourse')
}

module.exports = {
    getAllCourseByTutor,
    getSpecificCourse,
    createCourse,
    updateCourse,
    deleteCourse
}