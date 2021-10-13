const express = require('express');

const isAuthenticated = require('../controller/isAuthenticated');

const {getTodos , 
     createTodos , 
     updateTodo , 
     deleteTodo , 
     getSingleTodo } = require('../controller/todosController');

     
const router = express.Router() ; 



router.get('/', isAuthenticated ,getTodos) ; 

router.post('/' , isAuthenticated ,  createTodos) ; 

router.put('/:id' , isAuthenticated , updateTodo) ; 

router.delete('/:id' ,isAuthenticated ,deleteTodo) ; 

router.get('/:id' , isAuthenticated , getSingleTodo) ; 


module.exports = router ; 