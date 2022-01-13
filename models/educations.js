const mongoose = require("mongoose");
/*
//*add school or chollage name
//*education level bacholar or master or high school.
*/
const educationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    degree: {
        type: String,
        enum: [
            "High school degree",
            "Diploma",
            "Bachelor Degree",
            "Graduate Degrees",
            "Master Degree",
            "Professional Certificates",
        ],
        required: true,
    },
    about: {
        type: String,
        require: true,
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        require: true,
    },
    status: {
        type: String,
        default: "active",
        require: true,
    },
}, { timestamps: true });

const Education = mongoose.model("Educations", educationSchema);
module.exports = Education;