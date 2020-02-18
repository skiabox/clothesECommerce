import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

// Implicit return - multi-lines
// Destructure the tile from the props, so instead of passing props as an argument and use it in the h1 tag as {props.title} expression, we do the following
// style property in jsx take an object as parameter so the outer brackets are for javascript expression and the inner brackets belong to the object itself
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />

    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
