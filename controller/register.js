const User = require('../models/userModel');
const {genPassword} = require('../util/passwordUtils')


const register = async (req, res) => {
    const {email, password , username } = req.body;   

    try {
        const alreadyExist = await User.findOne({email: email})
        
        if(alreadyExist){

            return res.status(401).send("email already exists");
        }
        else{
            console.log('user has been created');
            const passwordHash = genPassword(password);
            var user =  new User(
                {
                    email : email,
                    username : username, 
                    password : passwordHash
                }
            )

            try {
        
                user = await user.save() ;
                return res.status(200).send(user)
                
            } catch (error) {
                console.log(error)
                if(error){
                return res.status(500).send({err : error})
            }
            }

            
        }
    } catch (error) {
                res.status(500).send({err : "some thingh went wrong "});
    }   
}
module.exports = register ; 