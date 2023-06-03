const { Schema, model } = require('mongoose')
const { USERS, COURSES, ORDERS } = require('../config/collection')

const ordersSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: USERS,
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: COURSES,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled']
    },
    price: {
        type: Number,
        required: true,
    },
},{
    timestamps: true,
})

const Orders = model(ORDERS, ordersSchema)


//listen to the change stream. Emits an event when there is a change  
Orders.watch()
    .on('change', (data) => {
        console.log(`Change occured in ${ORDERS} collection : ${data}`)
    })

module.exports = Orders