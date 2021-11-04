const jwt = require('jsonwebtoken');

const User = require('../models/userModel')
const {emailValidator}  = require('../util/validate')
const {validPassword} = require('../util/passwordUtils')

const userAuthentication = async (req , res , next ) => {
    console.log(req.body)
    const { email , password }  = req.body ;
    
    if(!(typeof email === 'string' && typeof password === 'string')){
        return res.status(400).send({err : "All fields are mendatory"})
    }
    else if(!emailValidator(email)){
        return res.status(400).send({err : "enter valid email"});
    }

    const user = await User.findOne({email : email });

    if(!user){
        return res.status(401).send({err : "email does not exist"});
    }

    const isValid = validPassword(password , user.password) ; 

    if(!(isValid)){
        return res.status(401).send({err : "wrong password"})
    }

    //creating      token
    const payload = {
        userId : user.id,
    }
    
    console.log(payload)

    const token = jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET , {expiresIn : '100000000s'});

    res.cookie('token', token, { httpOnly: true , maxAge: 900000000});  
    
    return res.status(400).send({sucess : true,msg : "logged in"});
    // return res.redirect('/todos')
}

module.exports = userAuthentication ;