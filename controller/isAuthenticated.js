const jwt = require('jsonwebtoken');

const User = require('../models/userModel')

const isAuthenticated = (req , res , next ) => {
    const token = req.cookies.token ; 
    if(!token){
        return res.status(403).send({err : "user not authenticated cookie not found"})
    }
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , user )=>{
        if(err){
            return res.status(403).send({err : "user not authenticated"})
        }
        req.userId = user.userId ; 
        next(); 
    }) 


}

module.exports = isAuthenticated ;  