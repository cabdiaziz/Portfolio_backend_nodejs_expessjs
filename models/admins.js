const mongoose = require("mongoose");
const Joi = require("joi");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
    },
    gender: {
      type: String,
    },
    type: {
      type: String,
      default: "admin",
    },
    token: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

//joi validation function.
function create_adminValidation(admin) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 3, tlds: { allow: ["com", "net", "so"] } })
      .required(),
    address: Joi.string().min(4).required(),
    phone: Joi.number().min(6).max(10).required(),
    gender: Joi.string().min(4).max(6).required(),
    type: Joi.string().required(),
    token: Joi.string().min(10),
    status: Joi.string().min(4),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  return schema.validate(admin);
}

const Admin = mongoose.model("Admins", adminSchema);

exports.Admin = Admin;
exports.create_adminValidation = create_adminValidation;
