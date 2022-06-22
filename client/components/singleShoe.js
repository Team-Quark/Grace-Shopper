import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleShoe } from '../store/singleShoe';

class SingleShoe extends React.Component {
  constructor() {
    super();
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.addShoe = this.addShoe.bind(this);

  }
  componentDidMount() {
    this.props.fetchSingleShoe(this.props.match.params.id);
    console.log(this.props);
  }

  addShoe() {
    const shoeId = this.props.singleShoe.id
    if(localStorage.getItem('cart') === null){
        localStorage.setItem('cart', JSON.stringify(
         {dictionary: {[shoeId]: 0}, shoes: [{...this.props.singleShoe, Product_Order:{quantity: 1}}]}
         ))
      } else{
        console.log(this.props.singleShoe)
          let updatingCart = JSON.parse(localStorage.getItem('cart'))
          if(updatingCart.dictionary[shoeId] === undefined){
            updatingCart.dictionary[shoeId] = updatingCart.shoes.length;
            updatingCart.shoes.push({...this.props.singleShoe, Product_Order:{quantity: 0}})
          } else{
            updatingCart.shoes[updatingCart.dictionary[shoeId]].Product_Order.quantity = updatingCart.shoes[updatingCart.dictionary[shoeId]].Product_Order.quantity + 1





          }
          // for(let i = 0; i< updatingCart.length; i++){
          //   if(updatingCart[i].id == this.props.singleShoe.id){
          //     updatingCart[i].Product_Order.quantity = updatingCart[i].Product_Order.quantity + 1
          //     break;
          //   }
          //   if(i === updatingCart.length -1 ){
          //     updatingCart.push({...this.props.singleShoe, Product_Order:{quantity: 0}});
          //   }
          // }
      localStorage.setItem('cart',
        JSON.stringify(updatingCart)
       )
          }
  }

  render() {
    console.log(this.props);
    return (
      <div key={this.props.singleShoe.id}>
        <center>
          <h2>{this.props.singleShoe.name}</h2>
          <img src={this.props.singleShoe.imageUrl} />
          <p>description: {this.props.singleShoe.description}</p>
          <p>Price: {this.props.singleShoe.price}</p>
          <p>Available Size: {this.props.singleShoe.availableSize}</p>
          <br />
          <br />

          <button onClick={this.addShoe}>Add to Cart</button>
        </center>
      </div>
    );
  }
}

const mapState = (state) => ({
  singleShoe: state.singleShoeReducer,
});

const mapDispatch = (dispatch) => ({
  fetchSingleShoe: (id) => dispatch(fetchSingleShoe(id)),
});

export default connect(mapState, mapDispatch)(SingleShoe);
