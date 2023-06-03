const instance = require('../config/razorpay');
const AppError = require('../utils/app.error.util');

const generateRazorpayOrder = async ({ price, userId, courseId, orderId, courseTitle }) => {

    const options = {
        amount: price, // amount in the smallest currency unit
        currency: "INR",
        receipt: orderId,
        notes: {
            user,
            userId,
            course: courseTitle,
            courseId
        }
    };

    try {
        const order = await instance.orders.create(options)
        console.log('order details from razorpay :', order)
        return order
    } catch (error) {
        console.log(`error happened while generating razorpay order for - ${orderId} `, error)
        throw AppError.transaction(error.message)
    }
}

module.exports = {
    generateRazorpayOrder
}