import axios from "axios";

const GET_PRODUCTS = 'GET_PRODUCTS';

const ALL_PRODUCTS = (shoes) => ({
    type: GET_PRODUCTS,
    shoes
});

export const fetchAllShoes = () => {
    return async (dispatch) => {
        const {data} = await axios.get('/api/shoes');
        dispatch(ALL_PRODUCTS(data))
    }
}

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type){
        case GET_PRODUCTS:
            return action.shoes;
        default:
            return state
    }
}