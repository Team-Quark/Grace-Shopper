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
    if(localStorage.getItem('cart') === null){
        localStorage.setItem('cart', JSON.stringify([this.props.singleShoe]))
      } else{
          let updatingCart = JSON.parse(localStorage.getItem('cart'))
          updatingCart.push(this.props.singleShoe);
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
          <img src={this.props.singleShoe.imageUrl} width={500}/>
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
