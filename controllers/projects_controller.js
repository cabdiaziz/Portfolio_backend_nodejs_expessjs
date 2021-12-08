const fs = require("fs");
const Project = require("../models/projects");
const Joi = require("joi");
const _ = require('lodash')



const view_allProjects = async (req, res) => {
  try{
    await req.admin.populate('myProject');
    if(req.admin.myProject == "") return res.status(404).send('You dosen\'t have any Poroject.')

    res.status(200).send(_.pick(req.admin.myProject, ['name', 'about', 'image', 'github', 'link', 'status']))
  }catch(err){
    console.log(err)
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);    
  }
};

const project_create = async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {  //* in the feauter you allow the user insert image.
    const project = await new Project(_.pick(project, ['name', 'about', 'github', 'link']));

    project.image = req.file ? req.file.path : "uploads\\default.png";
    project.person =req.admin._id

    await project.save();
    res.status(201).send(_.pick(project, ['name', 'about', 'github', 'link', 'image', 'status']));
  } catch (ex) {
    console.log(ex)
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
  }
};

const view_ProjectById = async (req, res) => {
  const _id = req.params.id
  try {
    const project = await Project.findOne({_id, person:req.admin._id});
    if (!project) return res.status(404).send('Not found any Project for you');

    res.send(_.pick(project, ['image','name', 'about', 'github', 'link','status']));
  } catch (ex) {
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
  }
};

const project_update = async (req, res) => {
  const image = req.file ? req.file.path : "uploads\\default.png";

  const { error } = update_validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updates = Object.keys(req.body)
  const allowedUpdates = ['name','about','github','link','image'];
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

  const _id = req.params.id;
  if(!isValidUpdate) return res.status(400).send({Error:'Invalid updates.!'})

  try {
    const project = await Project.findOne({_id, person:req.admin._id, image});
    if (!project) return res.status(404).send("The Project with Given ID was not found");

    if (project.image !== "uploads\\default.png") {
      fs.unlink(project.image, function (err) {
        if (err) return console.log(err);

        // if no error, file has been deleted successfully
        console.log("image deleted!");
      });
    }

    updates.forEach((update) => project[update] = req.body[update])
    await project.save();
    res.send(_.pick(project,['name', 'about','image', 'github', 'link','status']));
  } catch (ex) {
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
  }
};






//validation functions.

function validation(project) {
  const schema = Joi.object({
    name: Joi.string().required(),
    about: Joi.string().required(),
    github: Joi.string().required(),
    link: Joi.string().required(),
    person: Joi.string(),
    status: Joi.string(),
    image: Joi.string(),
  });
  return schema.validate(project);
}

function update_validation(project) {
  const schema = Joi.object({
      name: Joi.string(),
      about: Joi.string(),
      github: Joi.string(),
      link: Joi.string(),
      person: Joi.string(),
      status: Joi.string(),
      image: Joi.string(),
  });
  return schema.validate(project);
}

module.exports = {
  view_allProjects,
  view_ProjectById,
  project_create,
  project_update,
};