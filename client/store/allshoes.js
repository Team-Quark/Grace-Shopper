import axios from 'axios';

// Action Types
const GET_PRODUCTS = 'GET_PRODUCTS';
const DELETE_SHOE = 'DELETE_SHOE';
const UPDATE_SHOE = 'UPDATE_SHOE';
const ADD_SHOE = 'ADD_SHOE';

// Action Creators
const ALL_PRODUCTS = (shoes) => ({
  type: GET_PRODUCTS,
  shoes,
});

const deleteShoe = (shoe) => ({
  type: DELETE_SHOE,
  shoe,
});

const updateShoe = (shoe) => {
  return {
    type: UPDATE_SHOE,
    shoe,
  };
};

export const addShoe = (shoe) => ({
  type: ADD_SHOE,
  shoe,
});

//THUNK CREATOR
export const fetchAllShoes = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/shoes');
    dispatch(ALL_PRODUCTS(data));
  };
};

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

export const fetchUpdateShoe = (shoe, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    let res;
    if (token) {
      res = await axios.put(`/api/shoes/${shoe.id}/update`, shoe, {
        headers: {
          authorization: token,
        },
      });
    }
    dispatch(updateShoe(res.data));
    history.push('/shoes');
  };
};

export const fetchAddShoe = (shoe, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    let res;
    if (token) {
      res = await axios.post(`/api/shoes`, shoe, {
        headers: {
          authorization: token,
        },
      });
    }
    dispatch(addShoe(res.data));
    history.push('/');
  };
};

export const fetchShoeType = (type, history) => {
    return async (dispatch) => {
        const {data: shoes} = await axios.get(`/api/shoes/type/${type}`);
        dispatch(ALL_PRODUCTS(shoes));
        history.push('/shoes')
    }
}

const initialState = [];
// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.shoes;
    case DELETE_SHOE:
      return state.filter((shoe) => shoe.id !== action.shoe.id);
    case UPDATE_SHOE:
      return state.map((shoe) =>
        shoe.id === action.shoe.id ? action.shoe : shoe
      );
    case ADD_SHOE:
      return [...state, action.shoe];
    default:
      return state;
  }
};
