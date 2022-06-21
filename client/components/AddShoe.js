import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAddShoe } from '../store/allshoes';
import axios from 'axios';

export class AddShoe extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      imageUrl: '',
      description: '',
      price: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    await axios.post('/api/shoes', {
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      price: this.state.price,
    });
    this.setState({
      name: '',
      imageUrl: '',
      description: '',
      price: '',
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { name, imageUrl, description, price } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form id="create-shoe form" onSubmit={handleSubmit}>
        <h1>Create a New Shoe Below!</h1>
        <p>
          <label htmlFor="name"> Shoe Name: </label>
          <input name="name" value={name} onChange={handleChange} />
        </p>
        <p>
          <label htmlFor="name"> Image Url: </label>
          <input name="imageUrl" value={imageUrl} onChange={handleChange} />
        </p>
        <p>
          <label htmlFor="name"> Description: </label>
          <input
            name="description"
            value={description}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="name"> Price: </label>
          <input name="price" value={price} onChange={handleChange} />
        </p>
        <p>
          <button type="submit">Submit</button>
        </p>
        <p>
          <Link to="/shoes">Go Back to Main Page of Shoes </Link>
        </p>
      </form>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  fetchAddShoe: (shoe) => dispatch(fetchAddShoe(shoe, history)),
});

export default connect(null, mapDispatch)(AddShoe);
