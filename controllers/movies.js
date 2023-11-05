const { ValidationError, CastError } = require('mongoose').Error;
const Movie = require('../models/movie');

// имппорт ошибок и их кодов
const BadRequestError = require('../errors/badRequest');
const NotFoundError = require('../errors/notFound');
const ForbiddenError = require('../errors/forbiddenError');
const Statuses = require('../utils/statusCodes');

// импорт сообщений ответов и ошибок
const {
  MOVIE_BAD_REQUEST_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  INVALID_MOVIEDATA_MESSAGE,
  MOVIE_FORBIDDEN_DELETION_MESSAGE,
  SUCCESS_DELETION_MOVIE_MESSAGE,
} = require('../utils/responseMessages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movies) => res.send(movies.reverse()))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(Statuses.CREATED).send(movie))
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError(INVALID_MOVIEDATA_MESSAGE));
      } else {
        next(error);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFoundError(MOVIE_NOT_FOUND_MESSAGE))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(MOVIE_FORBIDDEN_DELETION_MESSAGE);
      }
      return Movie.deleteOne({ _id: movieId });
    })
    // в случае успеха отправляем ответ, что всё хорошо
    .then(() => res.status(Statuses.OK_REQUEST).send({ message: SUCCESS_DELETION_MOVIE_MESSAGE }))
    .catch((error) => {
      if (error instanceof CastError) {
        next(new BadRequestError(MOVIE_BAD_REQUEST_MESSAGE));
      } else {
        next(error);
      }
    });
};
