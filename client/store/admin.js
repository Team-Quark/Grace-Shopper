import axios from 'axios';

const GET_USERS = 'GET_USERS';
const NEW_PRODUCT = 'NEW_PRODUCT';

//ACTION CREATOR
const ALL_USERS = (users) => ({
  type: GET_USERS,
  users,
});

const ADD_PRODUCT = (product) => ({
  type: NEW_PRODUCT,
  product,
});

export const fetchAllUsers = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  let res;
  if (token) {
    res = await axios.get('/api/users', {
      headers: {
        authorization: token,
      },
    });
  }
  return dispatch(ALL_USERS(res.data));
};

export const addNewProduct = (product, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    let res;
    if (token) {
      res = await axios.post('/api/shoes', {
        headers: {
          authorization: token,
        },
        body: product,
      });
    }

    return dispatch(ADD_PRODUCT(res.body));
    // history.push('/shoes');
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      console.log('STATE STATE STATE ACTION.USERS ', action.users.data);
      return action.users;
    case NEW_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
};

//
