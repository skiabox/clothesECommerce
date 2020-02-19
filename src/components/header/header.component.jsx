import React from 'react';
import { Link } from 'react-router-dom';

// New way of importing SVG files as react components (Note: this feature is available with react-scripts@2.0.0 and higher, and react@16.3.0 and higher.)
import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = () => (
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
    </div>
  </div>
);

export default Header;
