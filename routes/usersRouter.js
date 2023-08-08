const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getInformation,
} = require('../controllers/userControllers');

userRouter.get('/', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().required(),
  }),
}), getAllUsers);

userRouter.get('/:userId', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().required(),
  }),
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
}), getUserById);

userRouter.patch('/me', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

userRouter.get('/me', getInformation);

userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
