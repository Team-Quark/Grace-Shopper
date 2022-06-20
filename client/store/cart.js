import axios from "axios";

// Action Types
const GET_CART = "GET_CART";
const CLEAR_CART = "CLEAR_CART";
const UPDATE_CART = "UPDATE_CART";
const REMOVE_SHOE = "REMOVE_SHOE";

// Action Creators
const FETCH_CART = (cart) => ({
  type: GET_CART,
  cart,
});

export const logoutCart = () => ({
  type: CLEAR_CART,
});

const UPDATE_CART_ = (cart) => ({
  type: UPDATE_CART,
  cart,
});

const REMOVE_SHOE_ = (cart) => ({
  type: REMOVE_SHOE,
  cart,
});

// Thunks
export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    if (token) {
      if (cart) {
        const { data } = await axios.post("/api/cart", { cart, token });
        dispatch(FETCH_CART(data.products));
      } else {
        const { data } = await axios.get("/api/cart", {
          headers: {
            authorization: token,
          },
        });
        dispatch(FETCH_CART(data.products));
      }
    }
  };
};

export const updateCart = (obj, history) => {
  return async (dispatch) => {
    const { data } = await axios.put("/api/cart", obj);
    dispatch(UPDATE_CART_(data.products));
    history.push(`/cart`);
  };
};

export const removeShoe = (obj, history) => {
  return async (dispatch) => {
    console.log(obj)
    const { data } = await axios.put("/api/cart/remove", obj);
    console.log(data);
    dispatch(REMOVE_SHOE_(data.products));
    history.push(`/cart`);
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case UPDATE_CART:
      return action.cart;
    case REMOVE_SHOE:
      return action.cart;
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
};
