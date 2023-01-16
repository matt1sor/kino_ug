const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  name: Joi.string().min(6).required,
  login: Joi.string().min(6).max(50).required,
  password: Joi.string().min(6).required,
});

const loginSchema = Joi.object({
  login: Joi.string().min(6).max(50).required,
  password: Joi.string().min(6).required,
});

const validator = (schema) => (data) =>
  schema.validate(data, { abortEarly: false });

module.exports.registerValidation = validator(registerSchema);
module.exports.loginValidation = validator(loginSchema);
