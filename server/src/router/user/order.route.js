const router = require('express').Router()
const orderController = require('../../controller/order.controller')
const isAuth = require('../../middlewares/user.auth')

/**
 * Base route to Orders
 * @route /api/users/orders
 */

// add isAuth middleware to all routes
router.use(isAuth)

router
    .route('/')
    .get(orderController.getAllOrders)

    router
    .route('/create')
    .post(orderController.createOrder)

router
    .route('/payment/verify')
    .post(orderController.verifyPayment)


module.exports = router