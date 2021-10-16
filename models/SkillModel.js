const mongoose = require("mongoose");
const Joi = require("joi");

const skillSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admins",
      required: true,
    },
  },
  { timestamps: true }
);

const SkillModel = mongoose.model("Skill", skillSchema);

function validation(skill) {
  const schema = Joi.object({
    name: Joi.string().required(),
    level: Joi.number().required(),
    about: Joi.string().required(),
    person: Joi.string().required(),
  });

  return schema.validate(skill);
}

module.exports = { validation, SkillModel };
