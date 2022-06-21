import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import allshoes from './allshoes';
import singleShoeReducer from './singleShoe';
import cart from './cart';
import admin from './admin';
import singleUserReducer from './singleUser';

const reducer = combineReducers({
  auth,
  allshoes,
  singleShoeReducer,
  cart,
  admin,
  singleUserReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
