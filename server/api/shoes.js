const router = require('express').Router();
const Product = require('../db/models/Product');

//SingleShoe
router.get('/:id', async (req, res, next) => {
  try {
    const singleShoe = await Product.findByPk(req.params.id);
    res.send(singleShoe);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
