import axios from "axios";

// Action Types
const GET_PRODUCTS = 'GET_PRODUCTS';


// Action Creators
const GET_PRODUCTS_ = (shoes) => ({
    type: GET_PRODUCTS,
    shoes
});


// Thunks
export const fetchAllShoes = () => {
    return async (dispatch) => {
        const {data} = await axios.get('/api/shoes');
        dispatch(GET_PRODUCTS_(data))
    }
}
export const fetchShoeType = (type, history) => {
    return async (dispatch) => {
        const {data: shoes} = await axios.get(`/api/shoes/type/${type}`);
        dispatch(GET_PRODUCTS_(shoes));
        history.push('/shoes')
    }
}

const initialState = [];
// Reducer
export default (state = initialState, action) => {
    switch(action.type){
        case GET_PRODUCTS:
            return action.shoes;
        default:
            return state
    }
}
