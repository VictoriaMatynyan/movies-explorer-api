const router = require('express').Router();
// импортируем роуты
const authRouter = require('./auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
// импортируем миддлвару
const auth = require('../middlewares/auth');
// испортируем контроллер логаута
const { logout } = require('../controllers/users');

const NotFoundError = require('../errors/notFound');
const { PATH_NOT_FOUND_MESSAGE } = require('../utils/responseMessages');

router.use('/', authRouter);

// защищаем роуты авторизацией
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.get('/signout', auth, logout);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(PATH_NOT_FOUND_MESSAGE));
});

module.exports = router;
