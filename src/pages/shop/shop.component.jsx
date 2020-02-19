import React, { useState } from 'react';

import SHOP_DATA from './shop.data';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

const ShopPage = () => {
  const [collections, setCollections] = useState(SHOP_DATA); //SHOP_DATA is an array of objects
  console.log(collections);

  return (
    <div className='shop-page'>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default ShopPage;
