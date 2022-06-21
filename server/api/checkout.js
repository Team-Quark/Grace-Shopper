const router = require("express").Router();
const {
    models: { User, Order, Product, Product_Order },
  } = require("../db");
module.exports = router;

function randomConfirmCode() {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//this route will change the current order to closed and then create a new order for the user to be his cart
router.get('/', async(req,res,next) => {
    try{
        const user = await User.findByToken(req.headers.authorization);
        const cart = await Order.findOne({
            where: {
            userId: user.id,
            orderStatus: "Open",
            }
        });
        cart.orderStatus = "Closed"
        cart.save();

        const newOrder = await Order.create({
            shippingAddress: '123 Main St',
            confirmCode: randomConfirmCode()
        });

        newOrder.setUser(user)
        res.json(cart);
    } catch (e){
        next(e)
    }
})