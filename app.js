const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routers/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('База данных подключена'));
const { PORT } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '64c52f6be159331185a2e483',
  };

  next();
});
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
});
