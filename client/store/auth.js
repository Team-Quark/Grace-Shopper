import axios from 'axios';
import history from '../history';
import { logoutCart } from './cart';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  // const cart = JSON.parse(window.localStorage.getItem('cart'));
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    // console.log(cart)
    console.log(res.data);
    //     let user = res.data
    //     let localCart = window.localStorage.getItem('cart')
    //     let sendingCart
    // if(!localCart){
    //   sendingCart = res.data
    // }

    // window.localStorage.setItem('cart', JSON.stringify(finalCart))

    // let finalCart = cart ? [...res.data.cart, ...cart] : res.data.cart;

    // res.data.cart = finalCart;
    // window.localStorage.setItem('cart', JSON.stringify(finalCart))
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (formData, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, formData);
    window.localStorage.setItem(TOKEN, res.data.token);
    //localStorage.getItem('token');
    localStorage.getItem('token');
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.clear();
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      // console.log(action.auth);
      return action.auth;
    default:
      return state;
  }
}
