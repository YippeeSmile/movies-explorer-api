require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const limiter = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');

const app = express();
const { PORT = 3001, MONGO_BD = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
app.use(limiter);
app.use(helmet());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose.connect(MONGO_BD);

app.listen(PORT);
