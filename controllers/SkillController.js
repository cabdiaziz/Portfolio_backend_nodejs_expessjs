const SkillModel = require("../models/SkillModel");

const getSkill = async (req, res) => {
  //   const skills = await SkillModel.find().sort({ name: 1 });

  res.send("Hello Skill");
};

module.exports = {
  getSkill,
};
