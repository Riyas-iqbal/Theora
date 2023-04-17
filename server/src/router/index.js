const router = require('express').Router()
const authRoute = require('./auth.route')
const privateRoute = require('./private.route')

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
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