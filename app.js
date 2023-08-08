const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const router = require('./routes/index');
const { createUser, login } = require('./controllers/userControllers');
const auth = require('./middlewares/auth');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(DB_URL)
  .then(() => console.log('База данных подключена'));

app.use(helmet());

const serverValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

app.post('/signup', serverValidation, createUser);
app.post('/signin', serverValidation, login);

app.use(auth);

app.use('/', router);

app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({ message: err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
});
