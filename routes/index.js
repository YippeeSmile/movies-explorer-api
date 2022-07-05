const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.use(auth);
router.use(require('./users', userRouter));
router.use(require('./movies', movieRouter));
router.use('*', (_, __, next) => next(new NotFoundError('Запрашиваемая страница не найдена')));

module.exports = router;
