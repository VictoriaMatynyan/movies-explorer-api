const { ValidationError, CastError } = require('mongoose').Error;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const generateToken = require('../utils/jwt');

// имппорт ошибок и их кодов
const NotFoundError = require('../errors/notFound');
const BadRequestError = require('../errors/badRequest');
const MongoDuplicateConflict = require('../errors/mongoDuplicate');
const Statuses = require('../utils/statusCodes');

// импорт сообщений ответов и ошибок
const {
  MONGO_CONFLICT_MESSAGE,
  USER_BAD_REQUEST_MESSAGE,
  SUCCESS_LOGOUT_MESSAGE,
  SUCCESS_LOGIN_MESSAGE,
  INVALID_USER_ID_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} = require('../utils/responseMessages');

const SAULT_ROUNDS = 10;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  // хешируем пароль
  bcrypt.hash(password, SAULT_ROUNDS)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(Statuses.CREATED).send({
      _id: user._id,
      name: user.name,
      email: user.email, // возвращаем данные без хэшированного пароля
    }))
    .catch((error) => {
      if (error.code === Statuses.MONGO_DUPLICATE) {
        next(new MongoDuplicateConflict(MONGO_CONFLICT_MESSAGE));
      } else if (error instanceof ValidationError) {
        next(new BadRequestError(USER_BAD_REQUEST_MESSAGE));
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
      return res.send({ message: SUCCESS_LOGIN_MESSAGE }); // было {token}
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: SUCCESS_LOGOUT_MESSAGE });
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  const userData = req.user._id;
  User.findById(userData)
  // orFail заменяет if-проверку в блоке then и не возвращает null, если объект не найден
    .orFail(new NotFoundError(USER_NOT_FOUND_MESSAGE))
    .then((user) => res.status(Statuses.OK_REQUEST).send(user))
    .catch((error) => {
      next(error);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError(USER_NOT_FOUND_MESSAGE))
    .then((user) => res.status(Statuses.OK_REQUEST).send(user))
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError(USER_BAD_REQUEST_MESSAGE));
      } else if (error instanceof CastError) {
        next(new BadRequestError(INVALID_USER_ID_MESSAGE));
      } else {
        next(error);
      }
    });
};
