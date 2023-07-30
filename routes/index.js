const router = require('express').Router();
const usersRouter = require('./usersRouter');
const cardsRouter = require('./cardsRouter');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/', (req, res) => {
  res.status(404).send({ message: 'Not Found' });
});

module.exports = router;
