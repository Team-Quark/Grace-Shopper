import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import {me} from  '../store';

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
  // if(!props.user.id && localStorage.getItem('token')){
    // }
    // console.log(localStorage.getItem('token'))
    if (!props.user.id && localStorage.getItem('token')) {
      console.log('we here')
       props.authToken()

// console.log( props.authToken())

      // setCart(props.user.cart);
      setCart(props.user.cart);
    }


    if(!props.user.id && !localStorage.getItem('token')){
      setCart(JSON.parse(localStorage.getItem("cart")));
      console.log("in if state");
    }

    if(!cart.length){
console.log(cart)
      setCart[props.user.cart]
    }

  }, []);

  return (
    <div>
      {console.log(props.user)}
      {cart === undefined? [] : cart.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            <h3>{item.price}</h3>
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
    authToken: () => dispatch(me())
  };
};

export default connect(mapState, mapDispatch)(Cart);
