const Task = require('../models/todoModel') ; 


const getTodos =async (req , res) => {
    const tasks = await Task.find({user : req.userId});

    if(!tasks){
        res.status(200).send({msg : "No task added "});
    }
    const result = tasks.map(data=> {
        return {id : data.id , task : data.task }
    });

    res.status(200).send(result);


}

const createTodos = async (req , res ) => {
    const { task } = req.body ; 

    if(!task){
        res.status(400).send({err : "all fields are mendatory"})
    }

    var newTask = new Task({
        task : task,
        user : req.userId
    })

    try{
        newTask = await newTask.save() ;
        return res.status(201).send({sucess : true , msg : "created the task successfully" , task : {id : newTask.id , task : newTask.task}} ) 
    }
    catch(err){
        return res.status(500).send({err : "internal server error "})
    }
}



const updateTodo =async (req  , res) => {
    const {task} = req.body ; 
    const filter = {id : req.params.id};
    const update = {
        task : task 
    }
    try {
    const task = await Task.findOneAndUpdate(filter , update , {new : true });
    res.status(201).send({sucess : true , msg : "successfully updated" , data : {id  :task.id , task : task.task} });
    }
    catch(err){
        return res.status(500).send({err : "internal server error "})
    }
    
}

const deleteTodo = async (req , res) => {
    const id = req.params.id ;   

    try{
        let deleted = await Task.findByIdAndDelete(id);
        res.status(201).send({sucess : true , msg : "successfully deleted"});
    }
    catch(err){
        res.status(500).send({err : "internal server error"})
    }
}

const getSingleTodo =  async(req , res ) => {
    const id = req.params.id ;   

    try{
        var searchedTask = await Task.findById(id) ; 
        res.status(200).send({id : searchedTask.id , task : searchedTask.task});
    }
    catch(err){
        res.status(500).send({err : "internal server error"})
    }
    
}

const taskDoesExist = async (req , res , next ) => {
    const id = req.params.id ; 

    try{
        var task = await Task.findById(id) ; 
        if(!task){
            return res.status(400).send({msg : "task doesnot exist "})
        }
        next()

    }
    catch(err){
        return res.status(500).send({msg : "Internel server error"})
    }
}


module.exports = {getTodos , 
                createTodos , 
                updateTodo , 
                deleteTodo , 
                getSingleTodo , 
                taskDoesExist
            } 
