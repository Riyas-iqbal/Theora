corsOptions = {
    origin: process.env.BASE_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}

module.exports = corsOptions