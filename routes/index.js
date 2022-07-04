const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.use(require('./users'));
router.use(require('./movies'));

router.use('*', (_, __, next) => next(new NotFoundError('Запрашиваемая страница не найдена')));

module.exports = router;
