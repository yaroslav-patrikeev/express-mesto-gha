// eslint-disable-next-line import/prefer-default-export
const handleErrors = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка на сервере' : err.message });
  next();
};

module.exports = handleErrors;
