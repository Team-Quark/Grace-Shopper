const router = require('express').Router();
const {
  models: { Product },
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

router.get('/type/:type', async (req, res, next) => {
  try {
    const shoes = await Product.findAll({
      where: {
        shoeType: req.params.type
      }
    });
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
  // console.log('==============', req.headers, req.body);
  try {
    // console.log(req.headers.authorization);
    const { admin } = await User.findByToken(req.headers.authorization);
    if (!admin) {
      return res.status(403).send('Admin login required');
    }
    res.status(201).send(await Product.create(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
