const asyncHandler = require('../utils/async.handler.util')
const { orderService } = require('../services')
const AppError = require('../utils/app.error.util')

const createOrder = asyncHandler(async (req, res) => {

    // const { error, value } = orderSchema.validate({...req.body})
    // if (error) {
    //     console.log(error)
    //     throw AppError.validation()
    // }
    

    const response = await orderService.createOrder({ userId: '643fbd366d4a1b4fe9e75549', courseId: '64624a6b399741aa02c3d970', user: 'hello' })
    console.log(response)

    res.status(200).json({
        message: 'Order created successfully', data: {
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        }
    })
})


const verifyPayment = asyncHandler((req, res) => {

})

module.exports = {
    createOrder
}