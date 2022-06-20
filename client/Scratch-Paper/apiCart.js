const router = require('express').Router();
const { models: { User, Order, Product, Product_Order }} = require('../db');
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

router.put('/', async (req,res,next) => {
    try{
        // req.body example object output = { productId: '1', orderId: '1', quantity: '3' }
       const {productId} = req.body;
       const {orderId} = req.body;
       const {quantity} = req.body;

        const targetShoeInCart = await Product_Order.update({ quantity},{
            where: {productId, orderId}
        })
        console.log(targetShoeInCart)

        // await targetShoeInCart.update({quantity})
        // await targetShoeInCart.reload();
        // console.log(targetShoeInCart.toJSON())

        // const cart = await Order.findAll({
        //     where: {
        //         userId: user.id,
        //         orderStatus: 'Open'
        //     },
        //     include: [Product]
        // });
        // const items = await Promise.all(req.body.cart.map(item => {
        //     return Product.findItem(item)
        // }));

        // cart[0].addProduct(items[0])

        res.send(await Order.findOne({where: {
            id: orderId
        },
        include:{
            model: Product,
            through: 'quantity'
        }}));
    } catch(e){
        next(e)
    }
})
