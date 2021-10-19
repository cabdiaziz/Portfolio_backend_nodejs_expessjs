const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
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
      type: String,
    },
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admins",
      required: true,
    },
    status: {
      type: String,
      default: true,
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Projects", projectSchema);

module.exports = ProjectModel;
