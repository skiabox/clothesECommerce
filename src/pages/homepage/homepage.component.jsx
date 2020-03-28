import React from 'react';

import Directory from '../../components/directory/directory.component';

//import './homepage.styles.scss';

import { HomePageContainer } from './homepage.styles';

// HomePageContainer is a styled div component that encapsulates its css styling code
// Implicit return, multi-line
const HomePage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
);

export default HomePage;
