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
    .then((data) => {
      if (!data) return res.status(404).send({ message: 'Not found' });
      return res.status(201).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(400).send({ message: 'Incorrect Data' });
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
