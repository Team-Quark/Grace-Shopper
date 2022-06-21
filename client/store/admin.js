import axios from 'axios';

const GET_USERS = 'GET_USERS';

const ALL_USERS = (users) => ({
  type: GET_USERS,
  users,
});

export const fetchAllUsers = () => async () => {
  console.log('FETCH ALL USERS IS BEING CALLED');
  const token = window.localStorage.getItem('token');
  let res;
  if (token) {
    res = await axios.get('/api/users', {
      headers: {
        authorization: token,
      },
    });
  }
  console.log('RECEIVED ALL USERS DATA, RES.DATA: ', res.data);
  return res.data;
};

const initialState = {
  users: [],
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      console.log('STATE STATE STATE ACTION.USERS ', action);
      return { ...state, users: action.users };
    default:
      return state;
  }
};
