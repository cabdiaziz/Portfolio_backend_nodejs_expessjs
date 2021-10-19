const Education = require("../models/educations")
const Joi = require("joi");
const _ = require('lodash');
const { pick } = require("lodash");

const education_create = async(req, res) => {
    const { error } = create_validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    try {
      const education = await new Education(_.pick(req.body, ['name', 'about']))
      education.person = req.admin._id
      await education.save()
      res.status(201).send(_.pick(education, ['name', 'about', 'person']));
    } catch (ex) {
      console.log(ex)
      for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
    }
}

const view_allEducation = async(req, res) => {

    try{
        await req.admin.populate('myEducation');
        if(req.admin.myEducation == "") return res.status(404).send('You dosen\'t have any Education.')
                
        res.status(200).send(_.pick(...req.admin.myEducation,['name', 'about', 'status']))
      }catch(err){
          console.log(err)
        for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);    
      }
}

const view_EducationById = async(req, res) => {
    const _id = req.params.id //* update file id
    try {
      const education = await Education.findOne({_id, person:req.admin._id});    
      if(!education) return res.status(404).send('not found any Education for you');
  
      return res.status(200).send(_.pick(education, ['name', 'about', 'status']))
    } catch (ex) {
      for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
    }
}

const education_update = async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','about', 'status'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    const _id = req.params.id;  //* updating item id.

    if(!isValidUpdate) return res.status(400).send({Error:'Invalid updates.!'})

    try {
    const education = await Education.findOne({_id, person: req.admin._id })
    if(!education) return res.status(404).send('Oops Not founded !!')

    updates.forEach((update) => education[update] = req.body[update])
    await education.save();
    res.status(200).send(_.pick(education, ['name','about', 'status'])) //*updated successfully
  } catch (ex) {
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
  }
}


//validation functions.
function create_validation(skill) {
    const schema = Joi.object({
      name: Joi.string().required(),      
      about: Joi.string().required(),
      person: Joi.string(),
      status: Joi.string()
    });
    return schema.validate(skill);
}


module.exports = {
    education_create,
    view_allEducation,
    view_EducationById,
    education_update
}