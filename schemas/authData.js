const Joi = require("joi");

const userBodyValidator = Joi.object({
  email: Joi.string().lowercase().required(),
  password: Joi.string().min(8).required().regex(/\w/),
});

const studentBodyValidator = Joi.object({
  firstname: Joi.string().lowercase().required(),
  lastname: Joi.string().lowercase().required(),
  gender: Joi.string().required(),
  admission_number: Joi.number().required(),
});

module.exports = { userBodyValidator, studentBodyValidator };
