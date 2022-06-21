import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUpdateShoe } from '../store/allshoes';
import { fetchSingleShoe, getSingleShoe } from '../store/singleShoe';
import axios from 'axios';

export class UpdateShoe extends React.Component {
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

  componentDidMount() {
    this.props.fetchSingleShoe(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearShoe();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleShoe.id !== this.props.singleShoe.id) {
      this.setState({
        name: this.props.singleShoe.name || '',
        imageUrl: this.props.singleShoe.imageUrl || '',
        description: this.props.singleShoe.description || '',
        price: this.props.singleShoe.price || '',
      });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateShoe({ ...this.props.singleShoe, ...this.state });
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
        <p>
          <label htmlFor="name"> Shoe Name: </label>
          <input name="name" value={name} onChange={handleChange} />
        </p>
        <p>
          <label htmlFor="name"> Image Url: </label>
          <input name="imageUrl" value={imageUrl} onChange={handleChange} />
        </p>
        <p>
          <label htmlFor="name"> Description </label>
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

const mapState = (state) => ({
  singleShoe: state.singleShoeReducer,
});

const mapDispatch = (dispatch, { history }) => ({
  fetchSingleShoe: (id) => dispatch(fetchSingleShoe(id)),
  updateShoe: (shoe) => dispatch(fetchUpdateShoe(shoe, history)),
  clearShoe: () => dispatch(getSingleShoe({})),
});

export default connect(mapState, mapDispatch)(UpdateShoe);
