const cardModel = require('../models/card');
const sendResponse = require('../utils/sendResponse');

const getAllCards = (req, res, next) => {
  sendResponse(cardModel.find().populate('owner'), res, next);
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: err.message });
      return res.status(500).send({ message: 'Server Error' });
    });
};

const deleteCard = (req, res) => {
  const cardOwner = cardModel.findOne(req.params.cardId)
    .then((card) => card.owner);
  if (cardOwner === req.user._id) {
    return sendResponse(cardModel.findByIdAndRemove(req.params.cardId), res);
  }
  return res.status(401).send({ message: 'Недостаточно прав' });
};

const like = (req, res, next) => {
  sendResponse(
    cardModel.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .populate(['owner', 'likes']),
    res,
    next,
  );
};

const deleteLike = (req, res, next) => {
  sendResponse(
    cardModel.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ),
    res,
    next,
  );
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  like,
  deleteLike,
};
