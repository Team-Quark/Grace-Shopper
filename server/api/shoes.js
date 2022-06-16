const router = require('express').Router();
const { models: { Product }} = require('../db');
module.exports = router;

router.get('/', async (req,res,next) => {
    try {
        const shoes = await Product.findAll();
        res.json(shoes);
    } catch (e){
        next(e)
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

module.exports = router;
