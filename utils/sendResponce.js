const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

const SUCCESSFUL_REQUEST = 200;

const sendResponce = (promise, res, next) => {
  promise
    .then((data) => {
      if (!data) throw new NotFoundError('Не найдено');
      return res.status(SUCCESSFUL_REQUEST).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') return next(IncorrectDataError('Некорректные данные'));
      return next(new ServerError());
    });
};

module.exports = sendResponce;
