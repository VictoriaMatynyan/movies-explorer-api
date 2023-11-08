const authRouter = require('express').Router();

const { signinValidation, signupValidation } = require('../middlewares/celebrateValidation');
const { createUser, login } = require('../controllers/users');

// роуты для логина и регистрации
authRouter.post('/signin', signinValidation, login);
authRouter.post('/signup', signupValidation, createUser);

module.exports = authRouter;
