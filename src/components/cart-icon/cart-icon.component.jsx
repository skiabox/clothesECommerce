import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

//destrucure new prop props.toggleCartHidden
const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

//show or hide the cart-item component by clicking this cart-icon component
const mapDispatchToProps = dispatch => ({
  //new prop added to component called toggleCartHidden
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

//show the number of items added in the cart
//we destructure again all the path from root-reducer.js to cart-reducer.js taking the value we want, using nested destructuring
const mapStateToProps = state => ({
  //new prop for our component (itemCount)
  itemCount: selectCartItemsCount(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
