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