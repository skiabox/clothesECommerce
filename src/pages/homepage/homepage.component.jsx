import React from 'react';

import Directory from '../../components/directory/directory.component';

import './homepage.styles.scss';

// Implicit return, multi-line
const HomePage = () => (
  <div className='homepage'>
    <Directory />
  </div>
);

export default HomePage;
