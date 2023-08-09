const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

const sendResponse = (promise, res, next) => {
  promise
    .then((data) => {
      if (!data) throw new NotFoundError('Не найдено');
      return res.status(200).send(data);
    })
    .catch((err) => {
      if (err.statusCode === 404) throw err;
      if (['ValidationError', 'CastError'].includes(err.name)) throw new IncorrectDataError('Некорректные данные');
      throw new ServerError('Ошибка на сервере');
    })
    .catch(next);
};

module.exports = sendResponse;
