import axios from 'axios';

const UPDATE_USER = 'UPDATE_USER';

const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

export const fetchUpdateUser = (user, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    let res;
    if (token) {
      res = await axios.put(`/api/users/${user.id}/profile`, user, {
        headers: {
          authorization: token,
        },
      });
    }
    dispatch(updateUser(res.data));
    history.push('/users');
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return state.map((user) =>
        user.id === action.user.id ? action.user : user
      );
    default:
      return state;
  }
};
