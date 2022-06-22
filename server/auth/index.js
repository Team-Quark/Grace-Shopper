const router = require('express').Router();
const {
  models: { User, Product },
} = require('../db');
const Order = require('../db/models/Order');
module.exports = router;

router.post('/login', async (req, res, next) => {
  console.log('Client Auth Req: ', req.body);
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

// DESTRUCTURE USER CREATE OBJECT TO PREVENT ADMIN FILED ATTACK
router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    user.addOrder(await Order.create({shippingAddress: user.address}))

    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization)

    const cart = await user.getOrders({
      where:{
        orderStatus: "Open"
      },
      include:{
        model: Product,
        through: {
          attributes: ['quantity']
        }
      },
    } )
// user.cart = cart[0].products
    // res.send({...user, cart: cart[0].products})
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
