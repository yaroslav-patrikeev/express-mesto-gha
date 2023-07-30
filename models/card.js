const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля - 2'],
      maxlength: [30, 'Максимальная длина поля - 30'],
      required: [true, 'Поле должно быть заполнено'],
    },
    link: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator: (v) => validator.isUrl(v),
        message: 'Некорректный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле должно быть заполнено'],
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
