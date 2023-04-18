require('dotenv').config()

const express = require('express')
const compression = require('./middlewares/compression')

const authLimiter = require('./middlewares/rate.limiter')
const customLog = require('./middlewares/logger')
const connectDB = require('./config/connection')

const app = express()


//Custom Http logging console and local
app.use(customLog)

//Applies gzip compression to responses for better network performance
app.use(compression)

app.use(express.json())

// Limit requests - Prevents DDos, Dos and Brute force attacks
if (process.env.NODE_ENV === 'production') {
    app.use('/api/auth', authLimiter)
}

//routes
app.use('/api', require('./router'))

app.use('*', (req, res) => {
    res.status(404).json('Not found')
})

connectDB()

app.listen('3000', () => {
    console.log('server started at port - 3000')
})