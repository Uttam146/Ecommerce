const express = require('express');
const config =  require('./configs/db.config'); //importing the server configs
require('dotenv').config(); //requiring the env file.
const bodyParser = require('body-parser');

const app = express(); //create a servername app
app.use(bodyParser.json()); 

const db = require('./models/index');


db.sequelize.sync({force:false})
.then(()=>{
    console.log('DB is connected');
})
.catch(()=>{
    console.log('DB is not connected');
})
//above code is used to start the server

//imported category route
require('./routes/category.route')(app);
require('./routes/product.route')(app);
require('./routes/auth.route')(app);
require('./routes/user.route')(app);
require('./routes/cart.route')(app);

app.listen(process.env.PORT,()=>{
    console.log(`Application is running on port ${process.env.PORT}`);
})




