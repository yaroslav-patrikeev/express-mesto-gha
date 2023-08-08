const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards,
  createCard,
  deleteCard,
  like,
  deleteLike,
} = require('../controllers/cardControllers');

cardsRouter.get('/', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().required(),
  }),
}), getAllCards);
cardsRouter.post('/', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required(),
  }),
}), createCard);
cardsRouter.delete('/:cardId', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().required(),
  }),
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
}), deleteCard);
cardsRouter.put('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().required(),
  }),
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
}), like);
cardsRouter.delete('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().required(),
  }),
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
}), deleteLike);

module.exports = cardsRouter;
