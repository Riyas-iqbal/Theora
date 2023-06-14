const orderRepository = require('../repository/order.repository')
const courseRepository = require('../repository/course.repository')
const transactionService = require('./transaction.service')
const AppError = require('../utils/app.error.util');

/**
 * Create a new order 
 */

const createOrder = async ({ courseId, userId, user }) => {

    const { price, title: courseTitle } = await courseRepository.findCourseById(courseId)
    if (!price) {
        console.log('price was not found for the course :' + courseId)
        throw AppError.database()
    }

    const { _id: orderId } = await orderRepository.createOrder({
        userId: userId,
        courseId: courseId,
        status: 'pending',
        price: price,
    })

    const orderDetails = await transactionService.generateRazorpayOrder({
        price,
        userId,
        user,
        courseTitle,
        courseId,
        orderId: orderId.toString(),
    })

    return { ...orderDetails, orderId }
}

const updateOrderStatus = async orderId => {
    const status = 'completed'
    const isUpdated = await orderRepository.updateOrderStatusById(orderId, status)
    return isUpdated

}

const getAllOrders = async (userId) => {
    const orders = await orderRepository.findOrdersByUserId(userId)
    if (!orders.length) {
        console.log('no transactions found for the user :', userId)
    }
    console.log('total orders by user:', userId, ' - ', orders.length)
    return orders
}

module.exports = {
    createOrder,
    getAllOrders,
    updateOrderStatus
}