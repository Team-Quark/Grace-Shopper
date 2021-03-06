import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCart,
  changeShoeQuantity,
  updateCart,
  removeShoe,
} from "../store/cart";

const Cart = (props) => {
  const { cart } = useSelector((state) => {
    return state;
  }); //pulling state in
  const { auth: user } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchCart(cart));
    console.log(cart);
  }, []);

  const changeQuantity = (e) => {
    e.persist();
    dispatch(changeShoeQuantity(e));

    console.log(cart);
  };

  return (
    <div>
      {console.log( cart)}
      {!cart.length ? (
          <p>
            Your Cart is currently empty, You can add Shoes to your cart by going to{' '}
            <span
              className="look-like-link"
              onClick={() => props.history.push('/shoes')}
            >
             Shoes
            </span>
          </p>
        )  : cart.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            <h3>
              $
              {!cart.length
                ? "loading..."
                : `${item.price} x${
                    cart[index].Product_Order.quantity
                  }: total $${
                    item.price * cart[index].Product_Order.quantity
                  }`}
            </h3>
            <img src={item.imageUrl} width={500} />
            <span htmlFor="quantity">Quantity :</span>
            <input
              type="number"
              data-id={item.id}
              name="quantity"
              min="1"
              max="99"
              value={
                item.Product_Order === undefined
                  ? "loading"
                  : item.Product_Order.quantity
              }
              onChange={(e) => changeQuantity(e)}
            />
            <input
              data-id={item.id}
              data-orderid={
                item.Product_Order === undefined
                  ? "loading"
                  : item.Product_Order.orderId
              }
              data-userid={[user.id]}
              data-quantity={
                item.Product_Order === undefined
                  ? "loading"
                  : item.Product_Order.quantity
              }
              type="button"
              value="Update Cart"
              onClick={(e) => dispatch(updateCart(e, props.history)) }
            />
            <input
              data-id={item.id}
              data-orderid={
                item.Product_Order === undefined
                  ? "loading"
                  : item.Product_Order.orderId
              }
              data-userid={[user.id]}
              onClick={(e) => dispatch(removeShoe(e, props.history))}
              type="button"
              value="X"
            />
            <hr />
          </div>
        );
      })}
      {
        !cart.length ? '' :
      <Link to="/checkout">
        <button>Checkout Cart</button>
      </Link>
      }
    </div>
  );
};

export default Cart
