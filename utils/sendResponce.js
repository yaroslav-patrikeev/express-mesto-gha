const SUCCESSFUL_REQUEST = 200;
const INCORRECT_DATA_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const SERVER_ERROR = 500;

const sendResponce = (promise, res) => {
  promise
    .then((data) => {
      if (!data) return res.status(NOT_FOUND_ERROR).send({ message: 'Not found' });
      return res.status(SUCCESSFUL_REQUEST).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(INCORRECT_DATA_ERROR).send({ message: 'Incorrect Data' });
      return res.status(SERVER_ERROR).send({ message: 'Server Error' });
    });
};

module.exports = sendResponce;
