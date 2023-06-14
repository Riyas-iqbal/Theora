const verifyToken = require('../utils/auth.util')

const isAuthAdmin = async (req, res, next) => {
    console.log('\aadmin isAuth Middleware accessed')

    const accessToken = req.cookies['adminToken'];

    /**
     * @desc for token passed in headers
     * const authHeader = req.headers['authorization']; 
     * const token = authHeader && authHeader.split(' ')[1]
     */

    if (!accessToken) return res.status(400).json({ err: "token is missing" });

    verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET)
        .then((response) => {
            console.log(response)
            if (response.role !== 'admin'){
                console.log('role is not admin');
                return res.status(403).json({ messsage : 'Not Authorized' })
            } 

            console.log('token verified admin')
            next()
        })
        .catch((err) => {
            console.error('token error')
            
            if (err?.name == "TokenExpiredError") console.log('token expired')
            else console.log(err)

            return res.status(401).json({ message : err?.message })
        })
}

module.exports = isAuthAdmin