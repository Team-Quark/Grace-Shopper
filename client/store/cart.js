import axios from 'axios';

// Action Types
const GET_CART = 'GET_CART';

// Action Creators
const CART_ITEMS = (cart) => ({
    type: GET_CART,
    cart
});

export const fetchCart = (list) => {
    return async(dispatch) => {
        const data = await axios.post('/api/users/cart', {list: list});
        dispatch(CART_ITEMS(data))
    }
}

const initialState =[];

export default (state = initialState, action) => {
    switch(action.type){
        case GET_CART:
            return action.cart;
        default:
            return state
    }
}
