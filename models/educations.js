const mongoose = require('mongoose');


const educationSchema = new mongoose.Schema(
    {
        name:{
         type: String,
         require: true
        },
        about:{
            type: String,
            require:true
        },
        person: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admins',
            require: true
        },
        status:{
            type: String,
            default: 'active',
            require: true
        }

    },
     {timestamps: true}
);

const Education = mongoose.model('Educations', educationSchema);
module.exports = Education