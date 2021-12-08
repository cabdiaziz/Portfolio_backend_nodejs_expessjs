const mongoose = require('mongoose')

require('dotenv').config(); //process.env.instance_name
const env = process.env; // this allow us to don't write process.env everytime.

mongoose.connect(env.MONGODB_URL)
    .then(() => console.log('Connected To Database'))
    .catch((err) => console.log('Unable To Connect...!', err));

//! u must require all our routes.

require('../routes/admins_route')
require('../routes/skills_route')
require('../routes/projects_route')
require('../routes/educations_route')