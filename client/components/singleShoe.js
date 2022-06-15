import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleShoe } from '../store/singleShoe';

class SingleShoe extends React.Component {
  constructor() {
    super();
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchSingleShoe(this.props.match.params.id);
    console.log(this.props);
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
