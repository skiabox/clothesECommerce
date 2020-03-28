import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

//import CustomButton from '../custom-button/custom-button.component';

//import './cart-dropdown.styles.scss';
import {
  CartDropdownContainer,
  CartDropdownButton,
  EmptyMessageContainer,
  CartItemsContainer
} from './cart-dropdown.styles';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

//destructure the props.cartItems
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
      ) : (
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      )}
    </CartItemsContainer>
    <CartDropdownButton
      onClick={() => {
        history.push('/checkout');
        //pass the toggleCartHidden action
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
);

//destructuring state
// const mapStateToProps = state => ({
//   cartItems: selectCartItems(state) //the new component prop
// });
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

//connect with only mapStateToProps gives a dispatch property to our component
//so we do not need to add a mapDispatchToProps
export default withRouter(connect(mapStateToProps)(CartDropdown));
