import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import {me} from  '../store';

const Cart = (props) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log('1st')
    let localCart = JSON.parse(localStorage.getItem('cart'))
    let localToken = localStorage.getItem('token')


    async function fetchData(){
      await props.fetchCart();
    }

    async function authUser(){
      await props.authToken();
    }
    console.log(props.cart)
if(!props.cart.length && localToken){
  console.log('true')
  authUser();
  console.log(props.user)
}

    fetchData();
console.log(props.cart)
    if(localCart !== null){
      setCart([...localCart, ...props.cart]);
    } else {
      setCart(props.cart)
      console.log(props.cart)
    }
  }, []);

  const changeQuantity = (e) => {
    e.persist();
    setCart(prevCart => prevCart.map(item => {
      if(item.id == e.target.id){
        item.Product_Order.quantity = e.target.value
      }
      return item
    }))
  }

  return (
    <div>
      {cart.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            <h3>${`${item.price} x${props.cart[index].Product_Order.quantity}: total $${item.price * props.cart[index].Product_Order.quantity}`}</h3>
            <img src={item.imageUrl} width={500} />
            <span htmlFor="quantity">Quantity :</span>
  <input type="number" id={item.id} name="quantity" min="1" max="99" value={item.Product_Order.quantity} onChange={(e) => changeQuantity(e)} />
  <input type="button" value="Update Cart" />
  <input type="button" value="X" />
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

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    authToken: () => dispatch(me())
  };
};

export default connect(mapState, mapDispatch)(Cart);
