const userModel = require('../models/user');
const sendResponce = require('../utils/sendResponce');

const getAllUsers = (req, res) => {
  sendResponce(userModel.find(), res);
};

const getUserById = (req, res) => {
  sendResponce(userModel.findById(req.params.userId), res);
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userModel.create({ name, about, avatar })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(400).send({ message: err.message });
      return res.status(500).send({ message: 'Server Error' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  sendResponce(userModel
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true }), res);
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  sendResponce(userModel
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true }), res);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
