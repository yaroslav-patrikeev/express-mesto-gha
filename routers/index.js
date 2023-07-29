const router = require('express').Router();
const usersRouter = require('./usersRouter');
const cardsRouter = require('./cardsRouter');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

module.exports = router;
