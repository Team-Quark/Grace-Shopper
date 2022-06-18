const router = require('express').Router();
const {
  models: { User, Product },
} = require('../db');
//const { requireToken } = require('./gateKeeping');
module.exports = router;

router.get('/', async (req, res, next) => {
  // console.log('header: ============> ', req);
  try {
    const { admin } = await User.findByToken(req.headers.authorization);
    if (!admin) {
      return res.status(403).send('Admin login required');
    }
    const users = await User.findAll({
      // explicitly select only ßthe id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/cart', async (req, res, next) => {
  try {
    const products = await Product.findItem(req.body.list);
    res.json(products);
  } catch (e) {
    next(e);
  }
});

router.post('/cart', async (req, res, next) => {
  try {
    const products = await Product.findItem(req.body.list);
    res.json(products);
  } catch (e) {
    next(e);
  }
});
