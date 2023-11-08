const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: {
      value: true,
      message: 'Необходимо ввести название фильма на русском языке',
    },
  },
  nameEN: {
    type: String,
    required: {
      value: true,
      message: 'Необходимо ввести название фильма на английском языке',
    },
  },
  country: {
    type: String,
    required: {
      value: true,
      message: 'Необходимо указать страну создания фильма',
    },
  },
  director: {
    type: String,
    required: {
      value: true,
      message: 'Необходимо указать режиссёра фильма',
    },
  },
  duration: {
    type: Number,
    required: {
      value: true,
      message: 'Необходимо указать длительность фильма',
    },
  },
  year: {
    type: String,
    required: {
      value: true,
      message: 'Необходимо указать год выпуска фильма',
    },
    minlength: [4, 'Введите 4 символа: ХХХХ'],
  },
  description: {
    type: String,
    required: {
      value: true,
      message: 'Необходимо добавить описание фильма',
    },
  },
  image: {
    type: String,
    required: {
      value: true,
      message: 'Необходимо указать ссылку на постер к фильму',
    },
    validate: {
      validator: (link) => isURL(link),
      message: 'Неверный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: {
      value: true,
      message: 'Необходимо указать ссылку на трейлер фильма',
    },
    validate: {
      validator: (link) => isURL(link),
      message: 'Неверный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: {
      value: true,
      message: 'Необходимо указать ссылку на миниатюру к фильму',
    },
    validate: {
      validator: (link) => isURL(link),
      message: 'Неверный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // связываем пользователя и карточку
    ref: 'user',
    required: {
      value: true,
      message: 'Необходимо указать автора карточки с фильмом',
    },
  },
  movieId: {
    type: Number,
    required: {
      value: true,
      message: 'Необходимо указать ID фильма',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
