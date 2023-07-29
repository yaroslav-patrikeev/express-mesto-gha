const userModel = require('../models/user');

const getAllUsers = (req, res) => {
  userModel.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const getUserById = (req, res) => {
  userModel.findById(req.params.userId)
    .then((user) => {
      if (!user) return res.status(404).send({ message: 'Not found' });
      return res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userModel.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Incorrect Data' });
      return res.status(500).send({ message: 'Server Error' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((info) => {
      if (!info) return res.status(404).send({ message: 'Not found' });
      return res.status(200).send(info);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Incorrect Data' });
      return res.status(500).send({ message: 'Server Error' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((info) => {
      if (!info) return res.status(404).send({ message: 'Not found' });
      return res.status(200).send(info);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Incorrect Data' });
      return res.status(500).send({ message: 'Server Error' });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
