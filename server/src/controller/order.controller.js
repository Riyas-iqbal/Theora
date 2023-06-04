const asyncHandler = require('../utils/async.handler.util')
const { orderService, userService } = require('../services')
const AppError = require('../utils/app.error.util')
const transactionService = require('../services/transaction.service')
const courseService = require('../services/course.service')

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

//validate body
const verifyPayment = asyncHandler(async (req, res) => {
    console.log(req.body)
    const data = transactionService.verifyPayment(req.body)

    if (data.signatureIsValid) {
        await courseService.enrollInCourse({
            courseId: req.body.course_id,
            userId: req.user._id
        })
    }

    res.status(200).json(data)
})

module.exports = {
    createOrder,
    verifyPayment
}