const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

const SUCCESSFUL_REQUEST = 200;

const sendResponse = (promise, res, next) => {
  promise
    .then((data) => {
      if (!data || data === null) throw new NotFoundError('Не найдено');
      return res.status(SUCCESSFUL_REQUEST).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') throw new IncorrectDataError('Некорректные данные');
      throw new ServerError('Ошибка на сервере');
    })
    .catch(next);
};

module.exports = sendResponse;
