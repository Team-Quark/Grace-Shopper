const router = require('express').Router();
const {
  models: { Product, User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const shoes = await Product.findAll();
    res.json(shoes);
  } catch (e) {
    next(e);
  }
});

//SingleShoe
router.get('/:id', async (req, res, next) => {
  try {
    const singleShoe = await Product.findByPk(req.params.id);
    res.send(singleShoe);
  } catch (err) {
    next(err);
  }
});

//ADDING A PRODUCT
router.post('/', async (req, res, next) => {
  try {
    console.log('THIS IS REQ.BODY', req.body);
    const { admin } = await User.findByToken(req.headers.authorization);
    if (!admin) {
      return res.status(403).send('Admin login required');
    }
    res.status(201).send(await Product.create(req.body));
  } catch (error) {
    next(error);
  }
});

//DELETING A PRODUCT
router.delete('/:id', async (req, res, next) => {
  try {
    // console.log(req.headers.authorization);
    const { admin } = await User.findByToken(req.headers.authorization);
    if (!admin) {
      return res.status(403).send('Admin login required');
    }
    const shoe = await Product.findByPk(req.params.id);
    await shoe.destroy();
    res.send(shoe);
  } catch (error) {
    next(error);
  }
});

//UPDATING A PRODUCT
router.put('/:id/update', async (req, res, next) => {
  try {
    const { admin } = await User.findByToken(req.headers.authorization);
    if (!admin) {
      return res.status(403).send('Admin login required');
    }
    const shoe = await Product.findByPk(req.params.id);
    res.send(await shoe.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
