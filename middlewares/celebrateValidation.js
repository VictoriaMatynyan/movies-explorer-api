const { celebrate, Joi } = require('celebrate');

// константы регулярок для ссылок и id
const linkRegEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const idRegEx = /^[0-9a-fA-F]{24}$/;

// централизованная обработка ошибок для авторизации и регистрации
module.exports.signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// централизованная обработка ошибок для пользователей
module.exports.userInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

// централизованная обработка ошибок для карточек с фильмами
module.exports.creatingMovieValidation = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4),
    description: Joi.string().required(),
    image: Joi.string().required().regex(linkRegEx),
    trailerLink: Joi.string().required().regex(linkRegEx),
    thumbnail: Joi.string().required().regex(linkRegEx),
    movieId: Joi.number().required(),
  }),
});

module.exports.moviesIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().regex(idRegEx).required(),
  }),
});
