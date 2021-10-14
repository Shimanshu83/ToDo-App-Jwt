const express = require('express');

const isAuthenticated = require('../controller/isAuthenticated');

const {getTodos , 
     createTodos , 
     updateTodo , 
     deleteTodo , 
     getSingleTodo , taskDoesExist } = require('../controller/todosController');

     
const router = express.Router() ; 



router.get('/', isAuthenticated ,getTodos) ; 


/**
 * the body field of the request will be    
 * {
 *   "task" : "done with the internship task "
 * }
 */
router.post('/' , isAuthenticated ,  createTodos) ; 




/**
 * the body field of the request will be    
 * {
 *   "task" : "updated the task "
 * }
 */
router.put('/:id' , isAuthenticated ,taskDoesExist, updateTodo) ; 

router.delete('/:id' ,isAuthenticated,taskDoesExist ,deleteTodo) ; 

router.get('/:id' , isAuthenticated ,taskDoesExist, getSingleTodo) ; 


module.exports = router ; 