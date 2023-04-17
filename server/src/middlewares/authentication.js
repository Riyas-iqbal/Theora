const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ err: "token is missing" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ err })
        }

        const { user } = decoded
        req.user = user

        next()
    })

}

module.exports = isAuth