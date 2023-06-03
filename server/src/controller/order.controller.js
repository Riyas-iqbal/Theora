const asyncHandler = require('../utils/async.handler.util')
const { orderService } = require('../services')
const AppError = require('../utils/app.error.util')

const createOrder = asyncHandler(async (req, res) => {

    // const { error, value } = orderSchema.validate({...req.body})
    // if (error) {
    //     console.log(error)
    //     throw AppError.validation()
    // }

    const response = await orderService.createOrder({ userId: req.user._id, courseId: req.body.courseId, user: req.user.name })

    res.status(200).json({
        message: 'Order created successfully', data: {
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        }
    })
})


const verifyPayment = asyncHandler((req, res) => {

    let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    const crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest('hex');
    console.log("sig received ", req.body.razorpay_signature);
    console.log("sig generated ", expectedSignature);

    var response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.razorpay_signature) {
        response = { "signatureIsValid": "true" }
    }

    
    res.send(response);
})

module.exports = {
    createOrder,
    verifyPayment
}