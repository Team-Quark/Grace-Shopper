import axios from "axios";

// Action Types
const GET_CART = "GET_CART";
const CLEAR_CART = "CLEAR_CART";
const UPDATE_CART = "UPDATE_CART";
const CHANGE_SHOE_QUANTITY = "CHANGE_SHOE_QUANTITY";
const REMOVE_SHOE = "REMOVE_SHOE";

// Action Creators
const FETCH_CART = (cart) => ({
  type: GET_CART,
  cart,
});

const CLEAR_CART_ = () => ({
      type: CLEAR_CART,
});

const UPDATE_CART_ = (cart) => ({
  type: UPDATE_CART,
  cart,
});

export const changeShoeQuantity = (e, cart) => ({
  type: CHANGE_SHOE_QUANTITY,
  cart,
  e,
});

const REMOVE_SHOE_ = (shoeId) => ({
  type: REMOVE_SHOE,
  shoeId,
});

// Thunks
export const fetchCart = (cartState) => {

  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const cart = JSON.parse(window.localStorage.getItem("cart"));

    if (token) {

      if (cart) {
        // console.log('theres a cart', cart)
        const { data } = await axios.post("/api/cart", { cart, token });
        // let localCartDic = {}
        // data.products.map((shoe, index) => localCartDic[shoe.id] = index)
        // data.shoes.map((shoe, index) => localCartDic[shoe.id] = index)
        // dispatch(FETCH_CART(data.products));
        dispatch(FETCH_CART(data.shoes));
        localStorage.setItem("cart", JSON.stringify(data));
      } else {
        const { data } = await axios.get("/api/cart", {
          headers: {
            authorization: token,
          },
        });

        dispatch(FETCH_CART(data.shoes));
        localStorage.setItem("cart", JSON.stringify(data));
      }
    } else {
      if (cart) {
        dispatch(FETCH_CART(cart.shoes));
      } else{
        dispatch(FETCH_CART([]));
      }
    }
  };
};

export const updateCart = (e, history) => {
  console.log(e.target);
  let obj = {
    productId: e.target.dataset.id,
    orderId: e.target.dataset.orderid,
    userId: e.target.dataset.userid,
    quantity: e.target.dataset.quantity,
  };
  const token = window.localStorage.getItem("token");
  const cart = JSON.parse(window.localStorage.getItem("cart"));
  if (!token) {
    return async (dispatch) => {
      cart.shoes[cart.dictionary[obj.productId]].Product_Order.quantity =
        parseInt(obj.quantity);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(UPDATE_CART_(cart.shoes));
      alert("Cart Updated");
      history.push(`/cart`);
    };
  } else {
    return async (dispatch) => {
      const { data } = await axios.put("/api/cart", obj);
      dispatch(UPDATE_CART_(data.shoes));
      localStorage.setItem("cart", JSON.stringify(data));
      alert("Cart Updated");
      history.push(`/cart`);
    };
  }
};

export const removeShoe = (e, history) => {
  e.persist();
  const token = window.localStorage.getItem("token");
  const cart = JSON.parse(window.localStorage.getItem("cart"));

  if (!token) {
    return async (dispatch) => {

      cart.shoes.splice(cart.dictionary[e.target.dataset.id], 1);
      cart.dictionary[e.target.dataset.id] = undefined;
      cart.shoes.map((shoe, index) =>{
        cart.dictionary[shoe.id] = index;
      });
      localStorage.setItem("cart", JSON.stringify(cart));

        dispatch(REMOVE_SHOE_(e.target.dataset.id));
        history.push(`/cart`);

    };
  } else{
    return async (dispatch) => {
      const { data: deleted } = await axios.delete(
        `/api/cart/${e.target.dataset.id}/${e.target.dataset.orderid}`
      );
      if (deleted) {
  const cart = JSON.parse(window.localStorage.getItem("cart"));
        let newCart = cart;
        newCart.shoes = cart.shoes.filter(shoe => shoe.id != e.target.dataset.id)
        console.log("deleted");
      localStorage.setItem("cart", JSON.stringify(newCart));

        dispatch(REMOVE_SHOE_(e.target.dataset.id));
        history.push(`/cart`);
      }
    };
  }

};

export const completeOrder = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const cart = window.localStorage.getItem("cart");
    if (token) {
      const { data } = await axios.get("/api/checkout", {
        headers: {
          authorization: token,
        },
      });
    }
  };
};

export const logoutCart = () => {
  return async (dispatch) => {
      console.log("deleted");
      dispatch(REMOVE_SHOE_(CLEAR_CART_()));
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case CHANGE_SHOE_QUANTITY:
      return state.map((item) => {
        if (item.id == action.e.target.dataset.id) {
          item.Product_Order.quantity = action.e.target.value;
        }
        return item;
      });
    case UPDATE_CART:
      return action.cart;
    case REMOVE_SHOE:
      return [...state.filter((shoe) => shoe.id != action.shoeId)];
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
};
