import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import {me} from  '../store';

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    console.log('1st')
    let localCart = JSON.parse(localStorage.getItem('cart'))
    // if(localCart){
    //   setCart(localCart);
    // }
    async function fetchData(){
      await props.fetchCart();
    }
    fetchData();

    if(localCart !== null){
      setCart([...localCart, ...props.cart]);
    } else {
      setCart(props.cart)
    }
//   if(!props.user.id && localStorage.getItem('token')){
//     props.authToken()
//     }
//     // console.log(localStorage.getItem('token'))
//     if ( localStorage.getItem('token')) {
//       // if (!props.user.id && localStorage.getItem('token')) {
//       console.log('we here')
//        console.log(props.cart)
//        console.log(props.user)

// // console.log( props.authToken())

//       // setCart(props.user.cart);
//       setCart(props.user.cart);
//     }


//     if(!props.user.id && !localStorage.getItem('token')){
//       setCart(JSON.parse(localStorage.getItem("cart")));
//       console.log("in if state");
//     }

//     if(!cart.length){
// console.log(cart)
//       setCart[props.user.cart]
//     }
  }, []);

  return (
    <div>
      {cart.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            <h3>{item.price}</h3>
            <h5>{item.description}</h5>
            <img src={item.imageUrl} width={500} />
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

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    authToken: () => dispatch(me())
  };
};

export default connect(mapState, mapDispatch)(Cart);
