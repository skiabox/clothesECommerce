import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//import './collections-overview.styles.scss';
import { CollectionsOverviewContainer } from './collections-overview.styles';

import CollectionPreview from '../collection-preview/collection-preview.component';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

//destructure collections from prop
const CollectionsOverview = ({ collections }) => (
  <CollectionsOverviewContainer>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </CollectionsOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
  //create new prop for the component
  collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
