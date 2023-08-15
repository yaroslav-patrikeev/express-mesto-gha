const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { handleErrors } = require('./middlewares/handleErrors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(DB_URL)
  .then(() => console.log('База данных подключена'));

app.use(helmet());

app.use('/', router);

app.use(errors());

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
});
