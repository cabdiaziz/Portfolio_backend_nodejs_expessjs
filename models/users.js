const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const env = process.env;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
        trim: true,
        lowercase: true,
        required: true,
    },
    address: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    phone: {
        type: Number,
        trim: true,
        validate: {
            validator: function(phone) {
                return phone >= 610000000 && phone <= 619999999;
            },
            message: "{VALUE} is not a valid phone number!,Please try again",
        },
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
    role: {
        type: String,
        enum: ["owner", "admin", "user"],
        default: "user",
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }, ],
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "banned"],
        default: "active",
    },
}, { timestamps: true });

userSchema.methods.generateToken = async function() {
    const newUser = this;
    const token = jwt.sign({ _id: newUser._id.toString() }, env.TOKEN_KEY);
    newUser.tokens = newUser.tokens.concat({ token });
    return token;
};

userSchema.statics.checkPassword = async(email, password) => {
    const user = await User.findOne({ email });
    if (!user) return user;

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return user;
    return user;
};
userSchema.virtual("myskills", {
    ref: "Skills", //relation model name or reference
    localField: "_id", //where is the relation posation is id (_id)
    foreignField: "person", // relationship collection column name is person
});

userSchema.virtual("myProject", {
    ref: "Projects",
    localField: "_id",
    foreignField: "person",
});

userSchema.virtual("myEducation", {
    ref: "Educations",
    localField: "_id",
    foreignField: "person",
});

const User = mongoose.model("Users", userSchema);

module.exports = User;