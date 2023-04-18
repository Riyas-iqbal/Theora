const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
            .then((e) => console.log(`connected to database - ${e.connections[0].name}`))
    } catch (err) {
        console.log(err)
    }
}

mongoose.connection
    .on('open', () => console.log('Mongoose connected successfully'))
    .on('error', (err) => console.error('Mongoose connection error:', err))

module.exports = connectDB