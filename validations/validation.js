// need to write joi validation for all types of user inputs.
const Joi = require("joi");

// module.exports = function create_validation(skill) {
//         const schema = Joi.object({
//             name: Joi.string().required(),
//             about: Joi.string().required(),
//             person: Joi.string(),
//             status: Joi.string()
//         });
//         return schema.validate(skill);
//     }
//validation functions.

exports.create_userValidation = (admin) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        address: Joi.string().min(4).required(),
        phone: Joi.string().required(),
        // .integer().required(),
        gender: Joi.string().min(4).max(6).required(),
        role: Joi.string(),
        tokens: Joi.array().items(Joi.string().required()), //this is how to validate arrays
        password: Joi.string()
            .min(8)
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
        password_confirm: Joi.any().valid(Joi.ref("password")),
        status: Joi.string().min(4),
    });
    return schema.validate(admin);
};

exports.updateUserValidation = (admin) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        }),
        address: Joi.string().min(4),
        phone: Joi.number().integer(), //* add the reg_exp
        gender: Joi.string().min(4).max(6),
        type: Joi.string(),
        tokens: Joi.array().items(Joi.string()), //this is how to validate arrays
        password: Joi.string().min(8).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        // password_confirm: Joi.any().valid(Joi.ref("password")),
        status: Joi.string().min(4),
    });
    return schema.validate(admin);
};

exports.userLogin_validation = (admin) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(4)
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string()
            .min(8)
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
    });
    return schema.validate(admin);
};