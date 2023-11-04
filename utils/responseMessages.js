const MONGO_CONFLICT_MESSAGE = 'Пользователь с таким email уже существует';
const USER_BAD_REQUEST_MESSAGE = 'Переданы некорректные данные для создания пользователя';
const SUCCESS_LOGIN_MESSAGE = 'Авторизация прошла успешно';
const SUCCESS_LOGOUT_MESSAGE = 'Выход из системы выполнен успешно';
const USER_NOT_FOUND_MESSAGE = 'Пользователь с указанным _id не найден';
const INVALID_USER_ID_MESSAGE = 'ID пользователя указан некорректно';
const INVALID_USERDATA_MESSAGE = 'Неправильные почта или пароль';

const INVALID_MOVIEDATA_MESSAGE = 'Переданы некорректные данные для сохранения фильма';
const MOVIE_BAD_REQUEST_MESSAGE = 'Передан некорректный id фильма';
const MOVIE_NOT_FOUND_MESSAGE = 'Фильм с указанным id не найден';
const MOVIE_FORBIDDEN_DELETION_MESSAGE = 'Разрешено удалять только свои добавленные фильмы';
const SUCCESS_DELETION_MOVIE_MESSAGE = 'Фильм успешно удалён';

const SERVER_ERROR_MESSAGE = 'Произошла ошибка на стороне сервера';
const UNAUTHORIZED_ERROR_MESSAGE = 'Токен не передан или передан не в том формате'; // для миддлвары auth

module.exports = {
  MONGO_CONFLICT_MESSAGE,
  USER_BAD_REQUEST_MESSAGE,
  SUCCESS_LOGIN_MESSAGE,
  SUCCESS_LOGOUT_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_USER_ID_MESSAGE,
  INVALID_USERDATA_MESSAGE,
  INVALID_MOVIEDATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  MOVIE_FORBIDDEN_DELETION_MESSAGE,
  SUCCESS_DELETION_MOVIE_MESSAGE,
  MOVIE_BAD_REQUEST_MESSAGE,
  SERVER_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
}