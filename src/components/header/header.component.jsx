import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

// New way of importing SVG files as react components (Note: this feature is available with react-scripts@2.0.0 and higher, and react@16.3.0 and higher.)
import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

//We are destructuring the object we are getting from root reducer (see at the end of the file)
//This value is null at the beginning
// --> destructuring the new prop coming from mapStateToProps props.currentUser
const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

// state is coming from root reducer
// so state.user is userReducer
// so currentUser initial state value is null
// --> //new prop for our component called currentUser (the key inside the returned object)
// advanced destructuring of state with nested objects
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  //currentUser: state.user.currentUser // the path after the : coms from root-reducer.js --> user.reducer.js (nested objects)
  currentUser,
  hidden
});

export default connect(mapStateToProps)(Header);
