const mongoose = require('mongoose');
//* qestion about person name can it changed into 'user'.
const educationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    about: {
        type: String,
        require: true
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require: true
    },
    status: {
        type: String,
        default: 'active',
        require: true
    }

}, { timestamps: true });

const Education = mongoose.model('Educations', educationSchema);
module.exports = Education