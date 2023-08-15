const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards,
  createCard,
  deleteCard,
  like,
  deleteLike,
} = require('../controllers/cardControllers');
const { urlRegExp, idRegExp } = require('../utils/constants');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(urlRegExp),
  }),
}), createCard);
cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(idRegExp).required(),
  }),
}), deleteCard);
cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(idRegExp).required(),
  }),
}), like);
cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(idRegExp).required(),
  }),
}), deleteLike);

module.exports = cardsRouter;
