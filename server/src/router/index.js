const router = require('express').Router()

const testRoute = require('./test.route')

const authRoute = require('./auth.route')

const tutorCourseRoute = require('./tutor/course.route')
const tutorLessonRoute = require('./tutor/lesson.route')
const tutorDetailsRoute = require('./tutor/tutor.route')

const userLessonRoute = require('./user/lesson.route')
const userCourseRoute = require('./user/course.route')
const userDetailsRoute = require('./user/details.route')
const userOrdersRoute = require('./user/order.route')

const adminUsersRoute = require('./admin/users.route')
const adminTutorsRoute = require('./admin/tutors.route')
const adminCategoryRoute = require('./admin/category.route')

const defaultRoutes = [
    {
        path: '/auth', route: authRoute
    },
    {
        path: '/tutor/courses', route: tutorCourseRoute
    },
    {
        path: '/tutor/lessons', route: tutorLessonRoute
    },
    {
        path: '/tutor/details', route: tutorDetailsRoute
    },
    {
        path: '/user/lessons', route: userLessonRoute
    },
    {
        path: '/user/courses', route: userCourseRoute
    },
    {
        path: '/user/details', route: userDetailsRoute
    },
    {
        path: '/user/orders', route: userOrdersRoute
    },
    {
        path: '/admin/users', route: adminUsersRoute
    },
    {
        path: '/admin/tutors', route: adminTutorsRoute
    },
    {
        path: '/admin/category', route: adminCategoryRoute
    },
    {
        path: '/test', route: testRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router