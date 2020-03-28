import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';

// New way of importing SVG files as react components (Note: this feature is available with react-scripts@2.0.0 and higher, and react@16.3.0 and higher.)
import { ReactComponent as Logo } from '../../assets/crown.svg';

//import './header.styles.scss';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

//We are destructuring the object we are getting from root reducer (see at the end of the file)
//This value is null at the beginning
// --> destructuring the new prop coming from mapStateToProps props.currentUser
// OptionLink as div uses the css of the OptionLink styled component to render a div this time instead of a Link
const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to='/shop'>CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as='div' onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/signin'>SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

// state is coming from root reducer
// so state.user is userReducer
// so currentUser initial state value is null
// --> //new prop for our component called currentUser (the key inside the returned object)
// advanced destructuring of state with nested objects
/* do it the classic way 
const mapStateToProps = state => ({
  //currentUser: state.user.currentUser // the path after the : coms from root-reducer.js --> user.reducer.js (nested objects)
  currentUser: selectCurrentUser(state),
  hidden: selectCartHidden(state)
}); */

//use createStructuredSelector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
