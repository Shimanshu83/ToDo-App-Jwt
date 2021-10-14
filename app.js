const express = require('express');
const methodOverride = require('method-override');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const todosRoute = require('./routes/todos');
const authRoute = require('./routes/auth');
const connectDB = require('./database/connection');

const app = express();

//cors 
app.use(cors());

app.use(express.urlencoded({extended : true}));   
app.use(express.json());
app.use(cookieParser());  

//database connection 
connectDB(); 

//overiding the method 
app.use(methodOverride('_method'))

//cookie parser 
require('dotenv').config(); 


//All the routes will be here only              
app.use('/todos' , todosRoute) ; 
app.use('/' , authRoute) ; 

app.use('/' , (req ,res )=>{
    res.status(404).send("path does not exist please vist /login or /signup path ")
})






//starting the server
const Port =  process.env.PORT || 3030 ; 
app.listen(Port);