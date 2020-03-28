/* sample data
const SHOP_DATA = [
  {
    id: 1,
    title: 'Hats',
    routeName: 'hats',
    items: [
      {
        id: 1,
        name: 'Brown Brim',
        imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
        price: 25
      },
      {
        id: 2,
        name: 'Blue Beanie',
        imageUrl: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
        price: 18
      },
*/

import React from 'react';
import { connect } from 'react-redux';

import './collection.styles.scss';
import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

//match.path here is "/shop/:collectionId"
//match.url here is what we typed "/shop/hats"
//match.params is an object of this form {collectionId: "hats"}
//destructure props.collection object that we get from the newly created prop collection
const CollectionPage = ({ collection }) => {
  //we destructure collection object to get title and items variables (of string and array type respectively)
  const { title, items } = collection;

  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

//we are using the second optional parameter of mapStateToProps here
// --documentation : It should take a first argument called state, optionally a second argument called ownProps,
// --and return a plain object containing the data that the connected component needs.
const mapStateToProps = (state, ownProps) => ({
  //new prop for the component here called collection
  // selectCollection is a function that returns a function
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
