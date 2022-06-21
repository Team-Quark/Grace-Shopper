import axios from 'axios';

const GET_SINGLE_USER = 'GET_SINGLE_USER';

//ACTION CREATOR
export const getSingleUser = (singleUser) => ({
  type: GET_SINGLE_USER,
  singleUser,
});

//THUNK CREATOR
export const fetchSingleUser = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/users/${id}`);
    dispatch(getSingleUser(data));
  };
};

//REDUCER
export default function singleUserReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.singleUser;
    default:
      return state;
  }
}
