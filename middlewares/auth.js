const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'ab7b913c948c8378b9a3eac83d7b2d0c' } = process.env;

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  return next();
};

module.exports = auth;
