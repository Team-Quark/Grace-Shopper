const router = require('express').Router();
const {
  models: { User, Product, Order },
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

router.get('/orders', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const userOrders = await Order.findAll({
      where: {
        userId: user.id,
        orderStatus: 'Closed',
      },
      include: [Product],
    });
    res.json(userOrders);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    // const { admin } = await User.findByToken(req.headers.authorization);
    // if (!admin) {
    //   return res.status(403).send('Admin login required');
    // }
    const singleUser = await User.findByPk(req.params.id);
    res.send(singleUser);
  } catch (err) {
    next(err);
  }
});

// router.get('/profile', async (req, res, next) => {
//   try {
//     const { admin } = await User.findByToken(req.headers.authorization);
//     if (!admin) {
//       return res.status(403).send('Admin login required');
//     }
//     const singleUser = await User.findByPk(req.params.id);
//     res.send(singleUser);
//   } catch (err) {
//     next(err);
//   }
// });

//UPDATING USER
router.put('/:id/profile', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (e) {
    next(e);
  }
});
