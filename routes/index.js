const router = require('express').Router();
// импортируем роуты
const authRouter = require('./auth');
const userRouter = require('./users');
const movieRouter = require('./cards');
// импортируем миддлвару
const auth = require('../middlewares/auth');
// испортируем контроллер логаута
const { logout } = require('../controllers/users');

router.use('/', authRouter);

// защищаем роуты авторизацией
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.get('/signout', auth, logout);

module.exports = router;
