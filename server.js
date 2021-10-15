const express = require('express');
const morgan = require('morgan');     //tell you the status of your request.
const adminRoutes = require('./routes/admin_route'); //routes/filename.
// const Admin = require('./models/admins') //this model is not avaliable right now b/c we dosen't create it.
// const auth = require('./middlewares/auth') // this authentication is not created.
require('./config/db');


require('dotenv').config() //env process.env.instance-variable.
const env =process.env; // this allow us to don't write process.env everytime.

const app = express()

app.use(express.json())
app.use(morgan('tiny')) // called morgan.


//my API'S from router folder
app.use('/api/admin', adminRoutes)

const port = env.PORT || 2000; // asign our server port.

app.listen(port,()=>{
    console.log(`This server is running on port http://localhost:${port}`);
});