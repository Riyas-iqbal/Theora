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

module.exports = {
    createOrder
}