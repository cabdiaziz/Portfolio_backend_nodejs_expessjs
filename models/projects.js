const mongoose = require("mongoose");
//*this schema need a lot of update. , names, status reason and need a description column.
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    image: {
        //* image must be sending files.
        type: String,
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    status: {
        type: String,
        default: true,
    },
}, { timestamps: true });

const ProjectModel = mongoose.model("Projects", projectSchema);

module.exports = ProjectModel;