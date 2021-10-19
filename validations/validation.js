
// need to write joi validation for all types of user inputs.
function create_validation(skill) {
    const schema = Joi.object({
      name: Joi.string().required(),      
      about: Joi.string().required(),
      person: Joi.string(),
      status: Joi.string()
    });
    return schema.validate(skill);
}