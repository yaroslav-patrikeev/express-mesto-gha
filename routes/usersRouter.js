const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getInformation,
} = require('../controllers/userControllers');
const { idRegExp, urlRegExp } = require('../utils/constants');

userRouter.get('/', getAllUsers);

userRouter.get('/me', getInformation);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().regex(idRegExp).required(),
  }),
}), getUserById);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegExp),
  }),
}), updateAvatar);

module.exports = userRouter;
