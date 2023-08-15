const router = require('express').Router();
const usersRouter = require('./usersRouter');
const cardsRouter = require('./cardsRouter');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login, logout } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuthentication, login);
router.use(auth);
router.use('/signout', logout);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
