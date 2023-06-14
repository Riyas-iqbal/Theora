const Order = require('../models/orders.model')
const AppError = require('../utils/app.error.util')

const createOrder = async ({ userId, courseId, status, price }) => {
    const order = new Order({
        user: userId,
        course: courseId,
        status,
        price
    })

    return order.save()
        .then(response => response)
        .catch(error => {
            console.log('Error while creating new order : ', error)
            throw AppError.database()
        })
}

const updateOrderStatusById = async (_id, status) => await Order.findByIdAndUpdate({ _id }, { status })


/**
 * Retrieves all the orders by specific user
 * @param {<String>} user userId
 * @returns 
 */
const findOrdersByUserId = async userId =>
    await Order
        .find({ user: userId })
        .select('-__v -updatedAt')
        .populate('course', 'title tagline price') //populating course field by selecting specified fields

module.exports = {
    createOrder,
    findOrdersByUserId,
    updateOrderStatusById
}