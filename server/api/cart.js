const router = require("express").Router();
const {
  models: { User, Order, Product, Product_Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const cart = await Order.findAll({
      where: {
        userId: user.id,
        orderStatus: "Open",
      },
      include: [Product],
    });
    res.json(cart[0]);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.token);
    const cart = await Order.findOne({
      where: {
        userId: user.id,
        orderStatus: "Open",
      },
      include: {
        model: Product,
        through: "quantity",
      },
    });





    const items = await Promise.all(
      req.body.cart.shoes.map((item) => {
        return Product.findItem(item);
      })
    );

    cart.addProduct(items[0]);

    res.send(cart);


  } catch (e) {
    next(e);
  }
});

router.put("/", async (req, res, next) => {
  try {
    // req.body expected object output example = { productId: '1', orderId: '1', userId: '1', quantity: '3' }
    const { productId } = req.body;
    const { orderId } = req.body;
    const { quantity } = req.body;

    await Product_Order.update(
      { quantity },
      {
        where: { productId, orderId },
      }
    );
    res.send(
      await Order.findOne({
        where: {
          id: orderId,
        },
        include: {
          model: Product,
          through: "quantity",
        },
      })
    );
  } catch (e) {
    next(e);
  }
});

router.delete("/:productId/:orderId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { orderId } = req.params;
    const cart = await Order.findOne({
      where: { id: orderId },
      include: {
        model: Product,
        through: "quantity",
      },
    });
    const targetShoeInCart = await Product.findOne({
      where: { id: productId },
    });
    await cart.removeProduct(targetShoeInCart);
    res.json(true);
  } catch (e) {
    next(e);
  }
});
