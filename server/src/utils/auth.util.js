const jwt = require('jsonwebtoken');


const verifyToken = (token, tokenSecret) => {
    return new Promise((resolve, reject) => {   
        jwt.verify(token, tokenSecret, (err, decoded) => {
            if (err) {
                return reject(err)
            }
            resolve(decoded)
        })
    })
}

module.exports = verifyToken