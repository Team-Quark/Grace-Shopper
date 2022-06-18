import axios from 'axios';

const GET_USERS = 'GET_USERS';

const ALL_USERS = (users) => ({
  type: GET_USERS,
  users,
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

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      // console.log('STATE STATE STATE ACTION.USERS ', action.users.data);
      return action.users;
    default:
      return state;
  }
};
