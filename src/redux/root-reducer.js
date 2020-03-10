import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//import regular storage from redux-persist
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

//config the redux-persist library
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

// export default combineReducers({
//   user: userReducer, //userReducer is an object of type {currentUser: null}
//   cart: cartReducer //cartReducer is an object of type {hidden: true, cartItems: []}
// });

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

//this exports the modified version of rootReducer with this persistConfig configuration
export default persistReducer(persistConfig, rootReducer);
