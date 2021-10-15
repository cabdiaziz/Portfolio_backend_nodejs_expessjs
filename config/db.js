const mongoose = require('mongoose')

require('dotenv').config(); //process.env.instance_name
const env =process.env; // this allow us to don't write process.env everytime.


const host_name = env.HOST;
const db_name = env.DB_NAME;

mongoose.connect(`mongodb://${host_name}/${db_name}`,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => console.log('Connected To Database'))
.catch((err) => console.log('Unable To Connect...!', err));


//u must require all our routes.
require('../routes/admin_route')
