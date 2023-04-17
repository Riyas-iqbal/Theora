const router = require('express').Router();
const jwt = require('jsonwebtoken');
const isAuth = require('../middlewares/authentication')

router
    .route('/')
    .post(
        isAuth,
        (req,res)=>{
            console.log(req.user)
            res.send(req.user)
        }
    )


module.exports = router