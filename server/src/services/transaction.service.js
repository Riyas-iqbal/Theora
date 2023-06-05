const instance = require('../config/razorpay');
const AppError = require('../utils/app.error.util');
const crypto = require('crypto');

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


const verifyPayment = ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest('hex');

    console.log("sig received ", razorpay_signature);
    console.log("sig generated ", expectedSignature);

    let data = { "signatureIsValid": "false" }
    if (expectedSignature === razorpay_signature) {
        data = { "signatureIsValid": "true" }
    }

    return data
}



module.exports = {
    generateRazorpayOrder,
    verifyPayment,
}