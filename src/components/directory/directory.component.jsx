import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item.component';

//import './directory.styles.scss';
import { DirectoryMenuContainer } from './directory.styles';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

//destructure the new prop we get from mapStateToProps
const Directory = ({ sections }) => {
  return (
    <DirectoryMenuContainer>
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} /> //same as title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}
      ))}
    </DirectoryMenuContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
