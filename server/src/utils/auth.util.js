const jwt = require('jsonwebtoken');


const verifyToken = (token) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return false
        }

        const { user } = decoded
        return user
    })
}

module.exports = verifyToken