const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

require('dotenv').config();

const env = process.env;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        default: "user",
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "active",
    },
}, { timestamps: true });



userSchema.methods.generateToken = async function() {
    const newUser = this
    const token = jwt.sign({ _id: newUser._id.toString() }, env.TOKEN_KEY);
    newUser.tokens = newUser.tokens.concat({ token })
    return token
}

userSchema.statics.checkPassword = async(email, password) => {
    const admin = await Admin.findOne({ email })
    if (!admin) return admin

    const checkPassword = await bcrypt.compare(password, admin.password)
    if (!checkPassword) return admin
    return admin
}
userSchema.virtual('myskills', {
    ref: 'Skills', //relation model name or reference
    localField: '_id', //where is the relation posation is id (_id)
    foreignField: 'person' // relationship collection column name is person
});

userSchema.virtual('myProject', {
    ref: 'Projects',
    localField: '_id',
    foreignField: 'person'
});

userSchema.virtual('myEducation', {
    ref: 'Educations',
    localField: '_id',
    foreignField: 'person'
});

const User = mongoose.model('Users', userSchema);

module.exports = User;