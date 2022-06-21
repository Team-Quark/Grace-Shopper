import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUpdateUser } from '../store/user';
import { fetchSingleUser, getSingleUser } from '../store/singleUser';
import axios from 'axios';

export class UpdateUser extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleUser(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleUser.id !== this.props.singleUser.id) {
      this.setState({
        email: this.props.singleUser.email || '',
        password: this.props.singleUser.password || '',
        firstName: this.props.singleUser.firstName || '',
        lastName: this.props.singleUser.lastName || '',
      });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateUser({ ...this.props.singleUser, ...this.state });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { email, password, firstName, lastName } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form id="create-user form" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name"> Email: </label>
          <input name="email" value={email} onChange={handleChange} />
        </p>
        <p>
          <label htmlFor="name"> Password: </label>
          <input name="password" value={password} onChange={handleChange} />
        </p>
        <p>
          <label htmlFor="name"> First Name: </label>
          <input name="firstName" value={firstName} onChange={handleChange} />
        </p>
        <p>
          <label htmlFor="name"> Last Name: </label>
          <input name="lastName" value={lastName} onChange={handleChange} />
        </p>
        <p>
          <button type="submit">Submit</button>
        </p>
        <p>
          <Link to="/admin">Go Back to Main Page of Users </Link>
        </p>
      </form>
    );
  }
}

const mapState = (state) => ({
  singleUser: state.singleUserReducer,
});

const mapDispatch = (dispatch, { history }) => ({
  fetchSingleUser: (id) => dispatch(fetchSingleUser(id)),
  updateUser: (user) => dispatch(fetchUpdateUser(user, history)),
  clearUser: () => dispatch(getSingleUser({})),
});

export default connect(mapState, mapDispatch)(UpdateUser);
