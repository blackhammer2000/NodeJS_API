const Joi = require("joi");

const userBodyValidator = Joi.object({
  email: Joi.string().lowercase().required(),
  password: Joi.string().min(8).required().regex(/\w/),
});

const studentBodyValidator = Joi.object({
  firstname: Joi.string()
    .lowercase()
    .required()
    .regex(/[a-z]g/),
  lastname: Joi.string()
    .lowercase()
    .required()
    .regex(/[a-z]g/),
  gender: Joi.string().required(),
  admission_number: Joi.number().required().regex(/[0-9]/g),
});

module.exports = { userBodyValidator, studentBodyValidator };
