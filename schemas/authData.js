const Joi = require("joi");

const userBodyValidator = Joi.object({
  email: Joi.string().lowercase().required(),
  password: Joi.string().min(8).required().regex(/\w/),
});

module.exports = userBodyValidator;
