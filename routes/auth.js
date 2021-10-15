const express = require('express');

const initialRegisterCheck = require('../controller/initialRegisterCheck')
const register = require('../controller/register')
const userAuthentication = require('../controller/userAuthentication'); 

const router = express.Router() ; 

/**
 * the body field of the request will be  
 * {
    "username" : "dheeraj",
    "email": "dheeraj8@gmail.com", //must be unique 
    "password":"s12345678",
    "confirmPassword": "s12345678"
}
 */
router.post('/signup', initialRegisterCheck, register ); 


/**
 * the body field of the request will be
 * {
 *  "email": "dheeraj8@gmail.com", //must be unique 
    "password":"s12345678"
 * }
     jwt-cookie authentication in this route  
 */

router.post('/login' , userAuthentication ); 

module.exports = router ; 