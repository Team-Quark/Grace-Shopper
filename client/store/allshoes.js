import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';
const DELETE_SHOE = 'DELETE_SHOE';

const ALL_PRODUCTS = (shoes) => ({
  type: GET_PRODUCTS,
  shoes,
});

const deleteShoe = (shoe) => ({
  type: DELETE_SHOE,
  shoe,
});

export const fetchAllShoes = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/shoes');
    dispatch(ALL_PRODUCTS(data));
  };
};

//THUNK CREATOR
export const fetchdeleteShoe = (id, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    let res;
    if (token) {
      res = await axios.delete(`/api/shoes/${id}`, {
        headers: {
          authorization: token,
        },
      });
    }
    dispatch(deleteShoe(res.data));
    history.push('/');
  };
};
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.shoes;
    case DELETE_SHOE:
      return state.filter((shoe) => shoe.id !== action.shoe.id);

    default:
      return state;
  }
};
