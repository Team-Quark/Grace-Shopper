import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleShoe } from '../store/singleShoe';

class SingleShoe extends React.Component {
  constructor() {
    super();
    this.addShoe = this.addShoe.bind(this);
  }
  componentDidMount() {
    this.props.fetchSingleShoe(this.props.match.params.id);
  }

  addShoe() {
    const shoeId = this.props.singleShoe.id;
    if (localStorage.getItem('cart') === null) {
      localStorage.setItem(
        'cart',
        JSON.stringify({
          dictionary: { [shoeId]: 0 },
          shoes: [{ ...this.props.singleShoe, Product_Order: { quantity: 1 } }],
        })
      );
    } else {
      console.log(this.props.singleShoe);
      let updatingCart = JSON.parse(localStorage.getItem('cart'));
      if (updatingCart.dictionary[shoeId] === undefined) {
        updatingCart.dictionary[shoeId] = updatingCart.shoes.length;
        updatingCart.shoes.push({
          ...this.props.singleShoe,
          Product_Order: { quantity: 1 },
        });
      } else {
        updatingCart.shoes[
          updatingCart.dictionary[shoeId]
        ].Product_Order.quantity =
          updatingCart.shoes[updatingCart.dictionary[shoeId]].Product_Order
            .quantity + 1;
      }
      localStorage.setItem('cart', JSON.stringify(updatingCart));
    }
  }

  render() {
    return (
      <div key={this.props.singleShoe.id}>
        <center>
          <h2>{this.props.singleShoe.name}</h2>
          <img src={this.props.singleShoe.imageUrl} width={500} />
          <p>description: {this.props.singleShoe.description}</p>
          <p>Price: {this.props.singleShoe.price}</p>

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
