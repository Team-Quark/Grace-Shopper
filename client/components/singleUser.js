import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUser';

class SingleUser extends React.Component {
  constructor() {
    super();
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.addShoe = this.addShoe.bind(this);
  }
  componentDidMount() {
    this.props.fetchSingleUser(this.props.match.params.id);
    console.log(this.props);
  }

  // addShoe() {
  //   if (localStorage.getItem('cart') === null) {
  //     localStorage.setItem('cart', JSON.stringify([this.props.singleShoe]));
  //   } else {
  //     let updatingCart = JSON.parse(localStorage.getItem('cart'));
  //     updatingCart.push(this.props.singleShoe);
  //     localStorage.setItem('cart', JSON.stringify(updatingCart));
  //   }
  // }

  render() {
    console.log(this.props);
    return (
      <div key={this.props.singleUser.id}>
        <center>
          <h2>{this.props.singleUser.email}</h2>

          <p>First Name:{this.props.singleUser.firstName}</p>
          <p>Last Name:{this.props.singleUser.lastName}</p>
          <p>Address: {this.props.singleUser.address}</p>
          <br />
          <br />

          {/* <button onClick={this.addShoe}>Add to Cart</button> */}
        </center>
      </div>
    );
  }
}

const mapState = (state) => ({
  singleUser: state.singleUserReducer,
});

const mapDispatch = (dispatch) => ({
  fetchSingleUser: (id) => dispatch(fetchSingleUser(id)),
});

export default connect(mapState, mapDispatch)(SingleUser);
