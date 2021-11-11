const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    
    task : {
        required : true , 
        type : String
    }, 
    user : {
        required : true , 
        type : String
    }

})
//todo Schema

module.exports = mongoose.model('todo' , todoSchema);