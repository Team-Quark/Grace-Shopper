import axios from 'axios';

const GET_SINGLE_SHOE = 'GET_SINGLE_SHOE';

//ACTION CREATOR
export const getSingleShoe = (singleShoe) => ({
  type: GET_SINGLE_SHOE,
  singleShoe,
});

//THUNK CREATOR
export const fetchSingleShoe = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/shoes/${id}`);
    dispatch(getSingleShoe(data));
  };
};

//REDUCER
export default function singleShoeReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_SHOE:
      return action.singleShoe;
    default:
      return state;
  }
}
