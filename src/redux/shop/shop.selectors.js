import { createSelector } from 'reselect';

//input selector
const selectShop = state => state.shop;

//output selectors
export const selectCollections = createSelector([selectShop], shop => shop.collections);

//get an array of items (now that all our data is an object)
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key]) //returns an array of items
);

// create anotheroutput selector using previous output selector
// selectCollection is a function that returns a function
export const selectCollection = collectionUrlParam =>
  createSelector([selectCollections], collections => collections[collectionUrlParam]);
