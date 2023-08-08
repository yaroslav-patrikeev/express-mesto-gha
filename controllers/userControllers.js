const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'ab7b913c948c8378b9a3eac83d7b2d0c' } = process.env;
const userModel = require('../models/user');
const sendResponse = require('../utils/sendResponse');

const getAllUsers = (req, res, next) => {
  sendResponse(userModel.find(), res, next);
};

const getUserById = (req, res, next) => {
  sendResponse(userModel.findById(req.params.userId), res, next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      return userModel.create(req.body);
    })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.code === 11000) return res.status(409).send({ message: 'Такой email уже зарегистрирован' });
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }
      return next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  sendResponse(userModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  ), res, next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  sendResponse(userModel
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true }), res, next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  userModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Неправильные почта или пароль' });
      }
      if (bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        return res.status(200).cookie('token', token, {
          maxAge: 3600000,
          httpOnly: true,
        }).send({ token });
      }
      return res.status(401).send({ message: 'Неправильные почта или пароль' });
    })
    .catch(next);
};

const getInformation = (req, res, next) => {
  const { _id } = req.user;
  sendResponse(userModel.findOne({ _id }), res, next);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getInformation,
};
