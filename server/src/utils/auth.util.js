const jwt = require('jsonwebtoken');


const verifyToken = async (token, tokenSecret) => {
    return new Promise((resolve, reject) => {   
        jwt.verify(token, tokenSecret, (err, decoded) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            const { user } = decoded
            resolve(user)
        })
    })
}

module.exports = verifyToken