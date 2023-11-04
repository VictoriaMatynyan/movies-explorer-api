const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3001, MONGO_URL = 'mongodb://127.0.0.1:27017/moviesdb'} = process.env;
const app = express();
app.use(express.json()); // вместо body parser

async function init() {
  await mongoose.connect(MONGO_URL);
  await app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
}

init();