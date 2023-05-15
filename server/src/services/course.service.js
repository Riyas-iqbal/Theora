const Course = require('../')

const createCourse = async (courseData, tutorId) => {

    console.log('create course servie')

    const course = new Course({
        title: courseData.title,
        about: courseData.about,
        tutor: tutorId,
        tagline: courseData.tagline,
        thumbnail: courseData.thumbnail,
        price: courseData.price,
    })

    await course.save()
        .catch(err => {
            console.log(err)
            return false
        })

    return true
}

const getAllCourseByTutor = async ( _id ) => {
    const courses = await Course.find({ _id }).catch(err => {console.log(err)});
    console.log(courses)
    return courses
}


module.exports = {
    createCourse,
    getAllCourseByTutor
}