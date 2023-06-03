const router = require('express').Router()
const orderController = require('../../controller/order.controller')
const isAuth = require('../../middlewares/user.auth')

/**
 * Base route to Orders
 * @route /api/users/orders 
 */

router
    .route('/create')
    .post(isAuth, orderController.createOrder)

// router
//     .route('/payment/verify')
//     .post(orderController.verifyPayment)

module.exports = router