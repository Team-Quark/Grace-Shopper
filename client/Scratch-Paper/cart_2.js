import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import {me} from  '../store';

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({});

  const updateQuantityAfterCartFetch = () =>{
console.log('hey')
    setQuantity(prevQ => {
      let newQ = {...prevQ}
      for(let item = 0;item<cart.length;item++){
        console.log(cart[item].id)
        if(!prevQ[cart[item].id]){
          newQ[cart[item].id] = cart[item].Product_Order.quantity
        } else if(prevQ[cart[item].id] !== cart[item].Product_Order.quantity){
          newQ[cart[item].id] = cart[item].Product_Order.quantity
        } else{
          continue;
        }
        return newQ

      }

    })


    console.log(quantity)
  }
  useEffect(() => {
    console.log('1st')
    let localCart = JSON.parse(localStorage.getItem('cart'))
    async function fetchData(){
      await props.fetchCart();
    }

    fetchData();
console.log(props.cart)
    if(localCart !== null){
      setCart([...localCart, ...props.cart]);
      updateQuantityAfterCartFetch()
    } else {
      setCart(props.cart)
      console.log(props.cart)
      updateQuantityAfterCartFetch()
    }
  }, []);

  const changeQuantity = (e) => {
    e.persist();
    console.log(e)
    // setQuantity(prevQ =>{
    //   let index = prevQ.findIndex(el => el.id == e.target.id)
    //   console.log(index)
    //   const newCart = prevQ
    //   newCart[index].Product_Order.quantity = e.target.value;
    //   return newCart

    // }
    //   )

    setQuantity({...quantity, [e.target.id]: e.target.value})
    console.log(quantity)
  }

  return (
    <div>
      {cart.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            <h3>${item.price}</h3>
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
