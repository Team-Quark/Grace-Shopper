const router = require('express').Router()
const { models: { User, Product}} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/cart', async (req,res,next) => {
  try{
    const products = await Product.findItem(req.body.list);
    res.json(products)
  } catch(e){
    next(e)
  }
})