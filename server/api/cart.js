const router = require("express").Router();
const {
  models: { User, Order, Product, Product_Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
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
    let cart2 = {
      dictionary: {},
      shoes: cart.products,
    };
    cart.products.map((shoe, index) => (cart2.dictionary[shoe.id] = index));
    res.json(cart2);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const guestCart = req.body.cart;
    const user = await User.findByToken(req.body.token);
    let cart = await Order.findOne({
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
      guestCart.shoes.map((item) => {
        cart.addProduct(item.id);
        return Product_Order.update(
          { quantity: item.Product_Order.quantity },
          {
            where: { productId: item.id, orderId: cart.id },
          }
        );
      })
    );
    const items2 = await Promise.all(
      guestCart.shoes.map((item) => {
        return Product_Order.update(
          { quantity: item.Product_Order.quantity },
          {
            where: { productId: item.id, orderId: cart.id },
          }
        );
      })
    );
    cart = await Order.findOne({
      where: {
        userId: user.id,
        orderStatus: "Open",
      },
      include: {
        model: Product,
        through: "quantity",
      },
    });
    res.json({ dictionary: guestCart.dictionary, shoes: cart.products });
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

    const cart = await Order.findOne({
      where: {
        id: orderId,
      },
      include: {
        model: Product,
        through: "quantity",
      },
    });
    let cart2 = {
      dictionary: {},
      shoes: cart.products,
    };
    cart.products.map((shoe, index) => (cart2.dictionary[shoe.id] = index));
    res.send(cart2);
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
