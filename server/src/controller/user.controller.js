const userService = require('../services/user.service')

const checkCourseEnrolled = (req, res) => {

    if (!req.user._id) {
        console.log(req.user._id)
        return res.status(200)
            .json({
                message: 'user is not logged in',
                enrolled: false
            })
    }

    const params = {
        courseId: req.params.id,
        userId: req.user.id
    }

    console.log(params)

    const isEnrolled = userService.isEnrolledForCourse(params)

    return res.status(200)
        .json({
            message: isEnrolled ? 'user is already enrolled for this course' : 'user is not enrolled for this course',
            enrolled: isEnrolled
        })
}

module.exports = {
    checkCourseEnrolled
}