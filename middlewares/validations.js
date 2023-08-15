const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../utils/constants');

export const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegExp),
  }),
});
export const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
