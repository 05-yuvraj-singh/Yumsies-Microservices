const express=require("express");
const app=express();
const cors=require('cors');
const dotenv=require('dotenv')
const recipieRoutes = require('./routes/recipieRoutes');

const corsOptions = {
    origin: '*', //any host can send request
    optionsSuccessStatus: 200, 
  };
  
  
  //middlewares
  express.json()
  app.use(cors(corsOptions));
  app.use(express.json());

//to update via form
app.use(express.urlencoded({extended: false}))
dotenv.config({path:'./config/config.env'})

// Recipie Routes 
app.use('/api/recipies', recipieRoutes);

module.exports = app;
