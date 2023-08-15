const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');

const sendResponse = (promise, res, next) => {
  promise
    .then((data) => {
      if (!data) throw new NotFoundError('Не найдено');
      return res.status(200).send(data);
    })
    .catch((err) => {
      if (['ValidationError', 'CastError'].includes(err.name)) next(new IncorrectDataError('Некорректные данные'));
      else next(err);
    });
};

module.exports = sendResponse;
