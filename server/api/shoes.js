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