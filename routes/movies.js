const movieRouter = require('express').Router();
const { creatingMovieValidation, moviesIdValidation } = require('../middlewares/celebrateValidation');
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');

// возвращает сохранённые текущим пользователем фильмы
movieRouter.get('/', getMovies);
movieRouter.post('/', creatingMovieValidation, addMovie);
// удаляет сохранённый фильм по id
movieRouter.delete('/:movieId', moviesIdValidation, deleteMovie);

module.exports = movieRouter;
