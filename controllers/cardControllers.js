const cardModel = require('../models/card');

const getAllCards = (req, res) => {
  cardModel.find()
    .populate('owner')
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Incorrect Data' });
      return res.status(500).send({ message: 'Server Error' });
    });
};

const deleteCard = (req, res) => {
  cardModel.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) return res.status(404).send({ message: 'Not found' });
      return res.status(200).send(card);
    })
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const like = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) return res.status(404).send({ message: 'Not found' });
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Incorrect Data' });
      return res.status(500).send({ message: 'Server Error' });
    });
};

const deleteLike = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return res.status(404).send({ message: 'Not found' });
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Incorrect Data' });
      return res.status(500).send({ message: 'Server Error' });
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  like,
  deleteLike,
};
