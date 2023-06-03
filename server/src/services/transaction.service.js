const instance = require('../config/razorpay');
const AppError = require('../utils/app.error.util');

const generateRazorpayOrder = async ({ price, userId, courseId, orderId, courseTitle, user }) => {
    let priceInSmallestUnit = price * 100 // 100rs = 1000p 

    const options = {
        amount: priceInSmallestUnit, // amount in the smallest currency unit
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