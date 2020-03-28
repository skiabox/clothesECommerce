import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

//import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

//import './cart-icon.styles.scss';
import { CartContainer, ShoppingIcon, ItemCountContainer } from './cart-icon.styles';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

//destrucure new prop props.toggleCartHidden
const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <CartContainer onClick={toggleCartHidden}>
    <ShoppingIcon />
    <ItemCountContainer>{itemCount}</ItemCountContainer>
  </CartContainer>
);

//show or hide the cart-item component by clicking this cart-icon component
const mapDispatchToProps = dispatch => ({
  //new prop added to component called toggleCartHidden
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

//show the number of items added in the cart
//we destructure again all the path from root-reducer.js to cart-reducer.js taking the value we want, using nested destructuring
/* const mapStateToProps = state => ({
  //new prop for our component (itemCount)
  itemCount: selectCartItemsCount(state)
}); */
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
