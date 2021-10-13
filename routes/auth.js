const express = require('express');

const initialRegisterCheck = require('../controller/initialRegisterCheck')
const register = require('../controller/register')
const userAuthentication = require('../controller/userAuthentication'); 

const router = express.Router() ; 

router.post('/signup', initialRegisterCheck, register ); 

router.post('/login' , userAuthentication ); 

module.exports = router ; 