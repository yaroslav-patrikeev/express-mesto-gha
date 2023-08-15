const cardModel = require('../models/card');
const sendResponse = require('../utils/sendResponse');
const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const ForbiddenError = require('../errors/ForbiddenError');

const getAllCards = (req, res, next) => {
  sendResponse(cardModel.find().populate('owner'), res, next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new IncorrectDataError(err.message));
      return next(new ServerError(err.message));
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  cardModel.findById(cardId)
    .then((card) => {
      if (!card) return next(new NotFoundError('Не найдено'));
      if (req.user._id !== card.owner.toString()) return next(new ForbiddenError('Недостаточно прав'));
      card.deleteOne()
        .then(() => res.status(200).send(card))
        .catch(next);
    })
    .catch((err) => {
      if (['ValidationError', 'CastError'].includes(err.name)) return next(new IncorrectDataError('Некорректные данные'));
      next(err);
    });
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
