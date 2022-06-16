import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    // console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token')) {

      setCart(props.user.cart);
    } else  {
      setCart(JSON.parse(localStorage.getItem("cart")));
      console.log("in if state");
    }
  }, []);

  return (
    <div>
      {cart === undefined? [] : cart.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            <h3>$${item.price}</h3>
            <h5>{item.description}</h5>
            <img src={item.imageUrl} />
          </div>
        );
      })}
    </div>
  );
};
const mapState = (state) => {
  return {
    user: state.auth,
    cart: state.cart.data,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (list) => dispatch(fetchCart(list)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
