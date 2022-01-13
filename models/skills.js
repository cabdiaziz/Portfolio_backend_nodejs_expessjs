const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    about: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    status: {
        type: String,
        default: "active",
        require: true,
    },
}, { timestamps: true });

const Skill = mongoose.model("Skills", skillSchema);

module.exports = Skill;