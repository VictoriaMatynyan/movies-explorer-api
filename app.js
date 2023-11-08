require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const centralizedErrorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/corsHandler');

const { NODE_ENV, PORT, DB_URL } = process.env;
const { MONGO_URL } = require('./utils/env.config');

const app = express();

// подключаем rate limiter как миддлвару
app.use(rateLimiter);

// проставляем заголовки безопасности
app.use(helmet());

// подключаем обработчик CORS политики как мидлвару
app.use(cors);

app.use(express.json()); // вместо body parser
app.use(cookieParser());

// подключаем логгер запросов
app.use(requestLogger);

// подключаем корневой роут для пользователей и карточек
app.use(router);

// подключаем логгер ошибок
app.use(errorLogger);

// обработчики ошибок валидации
app.use(errors());
app.use(centralizedErrorHandler);

async function init() {
  await mongoose.connect(NODE_ENV === 'production' ? DB_URL : MONGO_URL);
  await app.listen(PORT);
}

init();
