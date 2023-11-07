const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../errors/unauthorized');
const { INVALID_USERDATA_MESSAGE } = require('../utils/responseMessages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: {
      value: true,
      message: 'Необходимо ввести имя пользователя',
    },
    minlength: [2, 'Введите минимум 2 символа'],
    maxlength: [30, 'Максимум 30 символов'],
  },
  email: {
    type: String,
    required: {
      value: true,
      message: 'Необходимо ввести email пользователя',
    },
    validate: {
      validator: (email) => isEmail(email),
      message: (props) => `${props.value} - некорректный адрес почты`,
    },
    unique: true,
  },
  password: {
    type: String,
    required: {
      value: true,
      message: 'Необходимо ввести пароль пользователя',
    },
    select: false, // запрещаем возврат хэша пароля из API
  },
});

// сделаем код проверки почты и пароля частью схемы User: добавим метод findUserByCredentials
// у него будет два параметра — почта и пароль
userSchema.statics.findUserByCredentials = function findOneFunc(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(INVALID_USERDATA_MESSAGE));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(INVALID_USERDATA_MESSAGE));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
