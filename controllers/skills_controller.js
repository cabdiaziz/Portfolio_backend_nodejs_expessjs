const Skill = require("../models/skills")
const Joi = require("joi");
const _ = require('lodash');



const skill_create = async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const skills = await new Skill(_.pick(...req.body, ['name', 'level', 'about']))

  try {
    skills.person = req.admin._id
    await skills.save()

    res.status(201).send(_.pick(skills, ['name', 'level', 'about', 'status']));
  } catch (ex) {
    console.log(ex)
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
  }
};

const view_byId = async (req, res) => {
  const _id = req.params.id
  try {
    const skills = await Skill.findOne({_id, person:req.admin._id});    
    if(!skills) return res.status(404).send('not found any skills for you');

    return res.status(200).send(_.pick(skills, ['name', 'level','about', 'status']))
  } catch (ex) {
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
  }
};

const view_all = async(req, res) => {
  try{

    await req.admin.populate('myskills')
    if(req.admin.myskills == "") return res.status(200).send('You dosen\'t have any skills')

    res.status(200).send(_.pick(...req.admin.myskills, ['name', 'level', 'about', 'status']))
  }catch(ex){
    console.log(ex);
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);

  }
}

//* is working
const skill_update = async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'level','about', 'status'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    const _id = req.params.id;

    if(!isValidUpdate) return res.status(400).send({Error:'Invalid updates.!'})

    try {
    const skill = await Skill.findOne({_id, person: req.admin._id })
    if(!skill) return res.status(404).send('Oops Not founded !!')

    updates.forEach((update) => skill[update] = req.body[update])
    await skill.save();
    res.status(200).send(_.pick(skill, ['name', 'level','about', 'status'])) //*updated successfully.
  } catch (ex) {
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
  }
};


//! feature Api's 

//*Search or filter by highest to lowest
//*delete







//validation functions.
function validation(skill) {
  const schema = Joi.object({
    name: Joi.string().required(),
    level: Joi.number().integer().required(),
    about: Joi.string().required(),
    person: Joi.string()
  });

  return schema.validate(skill);
}

module.exports = {
  skill_create,
  view_byId,
  view_all,
  skill_update
};
