import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

//destructure the new prop we get from mapStateToProps
const Directory = ({ sections }) => {
  return (
    <div className='directory-menu'>
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} /> //same as title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
