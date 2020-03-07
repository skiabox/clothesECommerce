import { createSelector } from 'reselect';

//there are two types of selectors (functions) we can write
//the first type is called an input selector that does not use createSelector method
//the second type is called an output selector that does use input selectors and createSelector method to build themselves

//input selector
const selectCart = state => state.cart;

//export the memoize output selector
//createSelector is a function. First argument, selectors. Second argument is a function called with the selectors as arguments.
export const selectCartItems = createSelector([selectCart], cart => cart.cartItems);

//We use the previous output selector to build a new one
//We use the returned cartItems array from the previous selectCartItems selector
export const selectCartItemsCount = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
);
