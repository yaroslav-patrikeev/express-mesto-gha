// eslint-disable-next-line import/prefer-default-export
const handleErrors = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Ошибка на сервере' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = handleErrors;
