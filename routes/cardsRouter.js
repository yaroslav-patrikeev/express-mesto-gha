const cardsRouter = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  like,
  deleteLike,
} = require('../controllers/cardControllers');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', like);
cardsRouter.delete('/:cardId/likes', deleteLike);

module.exports = cardsRouter;
