const mongoose = require('mongoose')
try {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => { console.log('Connected To Database') })
        .catch((err) => console.log('Unable To Connect...!', err));
} catch (error) {
    console.log('500 erro occurs in the server', error)
}
//! u must require all our routes.

require('../routes/user_route')
require('../routes/skills_route')
require('../routes/projects_route')
require('../routes/educations_route')