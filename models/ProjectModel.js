const mongoose = require("mongoose");
const Joi = require("joi");

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
    state: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Projects", projectSchema);

function validation(skill) {
  const schema = Joi.object({
    name: Joi.string().required(),
    about: Joi.string().required(),
    github: Joi.string().required(),
    link: Joi.string().required(),
    person: Joi.string().required(),
    state: Joi.boolean(),
    image: Joi.string(),
  });

  return schema.validate(skill);
}

module.exports = { validation, ProjectModel };
