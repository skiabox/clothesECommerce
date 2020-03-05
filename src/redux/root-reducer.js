import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

export default combineReducers({
  user: userReducer, //userReducer is an object of type {currentUser: null}
  cart: cartReducer //cartReducer is an object of type {hidden: true, cartItems: []}
});
