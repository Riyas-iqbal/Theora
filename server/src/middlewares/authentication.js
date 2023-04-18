const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {

    const accessToken = req.cookies['accessToken'];
    const refreshToken = req.cookies['refreshToken'];

    // @desc for token passed in headers
    // const authHeader = req.headers['authorization']; 
    // const token = authHeader && authHeader.split(' ')[1]

    if (!accessToken) {
        return res.status(401).json({ err: "token is missing" });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ err })
        }

        const { user } = decoded
        console.log(user)
        req.user = user

        next()
    })

}

module.exports = isAuth