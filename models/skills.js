const mongoose = require("mongoose");

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

const Skill = mongoose.model("Skills", skillSchema);



module.exports =Skill;
