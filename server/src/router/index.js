const router = require('express').Router()
const authRoute = require('./auth.route')
const privateRoute = require('./private.route')
const tutorCourseRoute = require('./tutor/course.route')
const tutorLessonRoute = require('./tutor/lesson.route')
const userLessonRoute = require('./user/lesson.route')
const userCourseRoute = require('./user/course.route')

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/tutor/courses',
        route: tutorCourseRoute
    },
    {
        path: '/tutor/lessons',
        route: tutorLessonRoute
    },
    {
        path: '/user/lessons',
        route: userLessonRoute
    }, 
    {
        path: '/user/courses',
        route: userCourseRoute
    },
    {
        path: '/private',
        route: privateRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router