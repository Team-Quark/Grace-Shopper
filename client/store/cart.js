import axios from 'axios';

// Action Types
const GET_CART = 'GET_CART';
const CLEAR_CART = 'CLEAR_CART';

// Action Creators
const CART_ITEMS = (cart) => ({
    type: GET_CART,
    cart
});

export const logoutCart = () => ({
    type: CLEAR_CART,
})

export const fetchCart = () => {
    return async(dispatch) => {
        const token = window.localStorage.getItem('token');
        // const cart = JSON.parse(window.localStorage.getItem('cart'));
        if(token){
            const {data} = await axios.get('/api/cart', {
                headers: {
                    authorization: token
                }
            });
            dispatch(CART_ITEMS(data.products))
            // if(cart){
            //     data.products.push(...cart)
            // }
        } 
    }
}

const initialState =[];

export default (state = initialState, action) => {
    switch(action.type){
        case GET_CART:
            return action.cart;
        case CLEAR_CART:
            return []
        default:
            return state
    }
}
