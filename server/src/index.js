require('dotenv').config()

const express = require('express')

const { authLimiter } = require('./middlewares/rate-limiter')
const customLog = require('./middlewares/logger')
const connectDB = require('./config/connection')

const app = express()


//Custom Http logging console and local
app.use(customLog)

app.use(express.json())

// Limit repeated failed requests to auth endpoints
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