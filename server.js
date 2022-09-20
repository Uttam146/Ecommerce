const express = require('express');
const config =  require('./configs/db.config'); //importing the server configs
require('dotenv').config(); //requiring the env file.

const app = express(); //create a servername app

const db = require('./models/index');

db.sequelize.sync({force:true})
.then(()=>{
    console.log('DB is connected');
})
.catch(()=>{
    console.log('DB is not connected');
})

app.listen(process.env.PORT,()=>{
    console.log(`Application is running on port ${process.env.PORT}`);
})


