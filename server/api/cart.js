const router = require('express').Router();
const { models: { User, Order, Product }} = require('../db');
module.exports = router;

router.get('/', async (req,res,next)=>{
    try{
        const user = await User.findByToken(req.headers.authorization);
        const cart = await Order.findAll({
            where: {
                userId: user.id,
                orderStatus: 'Open'
            }, 
            include: [Product]
        });
        res.json(cart[0])
    } catch(e){
        next(e)
    }
})

router.post('/', async (req,res,next) => {
    try{
        const user = await User.findByToken(req.body.token)
        const cart = await Order.findAll({
            where: {
                userId: user.id,
                orderStatus: 'Open'
            }, 
            include: [Product]
        });
        const items = await Promise.all(req.body.cart.map(item => {
            return Product.findItem(item)
        }));

        cart[0].addProduct(items[0])

        res.send(cart[0]);
    } catch(e){
        next(e)
    }
})