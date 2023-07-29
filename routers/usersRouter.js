const userRouter = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/userControllers');

userRouter.get('/', getAllUsers);

userRouter.get('/:userId', getUserById);

userRouter.post('/', createUser);

userRouter.patch('/me', updateProfile);

userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
