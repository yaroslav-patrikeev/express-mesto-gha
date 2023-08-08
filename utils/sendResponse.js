const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

const SUCCESSFUL_REQUEST = 200;

const sendResponse = (promise, res, next) => {
  promise
    .then((data) => {
      if (!data) throw new NotFoundError('Не найдено');
      return res.status(SUCCESSFUL_REQUEST).send(data);
    })
    .catch((err) => {
      console.log(err);
      if (err.statusCode === 404) throw err;
      if (['ValidationError', 'CastError'].includes(err.name)) throw new IncorrectDataError('Некорректные данные');
      throw new ServerError('Ошибка на сервере');
    })
    .catch(next);
};

module.exports = sendResponse;
