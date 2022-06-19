import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { fetchCart } from "../store/cart";
import {me} from  '../store';

const Cart = (props) => {
  // const [cart, setCart] = useState([]);

  const {cart} = useSelector(state => { return state}); //pulling state in 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart())

    // let localCart = JSON.parse(localStorage.getItem('cart'))
    // async function fetchData(){
    //   await props.fetchCart();
    // }
    // fetchData();

    // if(localCart !== null){
    //   setCart([[...localCart, ...props.cart]]);
    // } else {
    //   setCart(props.cart)
    // }
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

export default Cart
