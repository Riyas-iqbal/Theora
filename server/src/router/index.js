const router = require('express').Router()
const authRoute = require('./auth.route')
const privateRoute = require('./private.route')
const tutorCourseRoute = require('./tutor/course.route')

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path:'/tutor/courses',
        route: tutorCourseRoute
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