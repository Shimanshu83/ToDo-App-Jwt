const {emailValidator , passwordValidator} = require('../util/validate');

const registerInitailCheck = (req , res , next ) => {
    
    const {username, email, password, confirmPassword} = req.body ; 
    if (
        !(typeof username === 'string' &&
        typeof email === 'string' && 
        typeof password === 'string' && 
        typeof confirmPassword === 'string') 
    ){
        
        res.status(400).send({err : 'All fields are mendatory '});
    }
    else if (!(password === confirmPassword)){
        res.status(400).send({err : 'password and confirmPassword must match'})
    }
    else if (!emailValidator(email)){
        res.status(400).send({err : 'please enter the valid emai'})
    }
    else if(!passwordValidator(password)){
        
        res.status(400).send({err : 'password must be minimum eigth character, at least one letter and one number'});
        
    }
    
    next() ; 

}

module.exports = registerInitailCheck ; 