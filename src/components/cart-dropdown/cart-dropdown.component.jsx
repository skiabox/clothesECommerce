import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';

//destructure the props.cartItems
const CartDropdown = ({ cartItems }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.map(cartItem => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))}
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

//destructuring state
const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems //the new component prop
});

export default connect(mapStateToProps)(CartDropdown);
