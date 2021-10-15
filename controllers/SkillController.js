const { SkillModel, validation } = require("../models/SkillModel");

const getSkills = async (req, res) => {
  const skills = await SkillModel.find().sort({ name: 1 });

  res.send(skills);
};

const getSkillById = async (req, res) => {
  try {
    const getSkill = await SkillModel.findById(req.params.id);
    if (!getSkill)
      return res.status(404).send("The Skill with Given ID was not found");

    res.send(getSkill);
  } catch (ex) {
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
  }
};

const postSkill = async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const skill = new SkillModel(req.body);
    const result = await skill.save();
    res.send(result);
  } catch (ex) {
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
  }
};

const updateSkill = async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const getSkill = await SkillModel.findById(req.params.id);
    if (!getSkill)
      return res.status(404).send("The Skill with Given ID was not found");

    const result = await SkillModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.send(result);
  } catch (ex) {
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
  }
};

module.exports = {
  getSkills,
  postSkill,
  updateSkill,
  getSkillById,
};
