const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.use(require('/users', users));
router.use(require('/movies', movies));

router.use('*', (_, __, next) => next(new NotFoundError('Запрашиваемая страница не найдена')));

module.exports = router;
