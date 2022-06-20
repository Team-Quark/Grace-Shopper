import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  changeShoeQuantity,
  updateCart,
  removeShoe,
} from "../store/cart";
import { me } from "../store";

const Cart = (props) => {
  // const [cart, setCart] = useState([]);
  // const [updateMessage, setUpdateMessage] = useState('');
  const { cart } = useSelector((state) => {
    return state;
  }); //pulling state in
  const { auth: user } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();


  useEffect(() => {
    // let localCart = JSON.parse(localStorage.getItem("cart"));
    // let localToken = localStorage.getItem("token");

    dispatch(fetchCart());
    // async function fetchData() {
    //   await props.fetchCart();
    // }

    // async function authUser() {
    //   await props.authToken();
    // }
    console.log(cart);
    // if (!cart.length && localToken) {
    //   console.log("true");
    //   dispatch(me())
    //   // authUser();
    //   console.log(user);
    // }

    // fetchData();
    // console.log(cart);
    // if (localCart !== null) {
    //   setCart([[...localCart, ...props.cart]]);
    // } else {
    //   setCart(props.cart);
    //   console.log(props.cart);
    // }
  }, []);

  const changeQuantity = (e) => {
    e.persist();
    dispatch(changeShoeQuantity(e));
    // setCart((prevCart) =>
    //   prevCart.map((item) => {
    //     if (item.id == e.target.dataset.id) {
    //       item.Product_Order.quantity = e.target.value;
    //     }
    //     return item;
    //   })
    // );
    console.log(cart);
  };

  const removeShoe_ = (e) => {
    props.removeShoe({
      productId: e.target.dataset.id,
      orderId: e.target.dataset.orderid,
      userId: e.target.dataset.userid,
    });
  };

  return (
    <div>
      {console.log(props.user, props.cart)}
      {cart.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            <h3>
              $
              {!props.cart.length
                ? "loading..."
                : `${item.price} x${
                    props.cart[index].Product_Order.quantity
                  }: total $${
                    item.price * props.cart[index].Product_Order.quantity
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
              data-userid={[props.user.id]}
              data-quantity={
                item.Product_Order === undefined
                  ? "loading"
                  : item.Product_Order.quantity
              }
              type="button"
              value="Update Cart"
              // onClick={updateCart}
              onClick={(e) => dispatch(updateCart(e, props.history)) }
            />
            <input
              data-id={item.id}
              data-orderid={
                item.Product_Order === undefined
                  ? "loading"
                  : item.Product_Order.orderId
              }
              data-userid={[props.user.id]}
              // onClick={removeShoe_}
              onClick={(e) => dispatch(removeShoe(e, props.history))}
              type="button"
              value="X"
            />
            {/* <h5>description:</h5>
            {item.description} */}
            <hr />
          </div>
        );
      })}
    </div>
  );
};
const mapState = (state) => {
  return {
    user: state.auth,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    authToken: () => dispatch(me()),
    updateCart: (obj) => dispatch(updateCart(obj, history)),
    removeShoe: (obj) => dispatch(removeShoe(obj, history)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
