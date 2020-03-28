import { createSelector } from 'reselect';

//input selector
const selectShop = state => state.shop;

//output selectors
export const selectCollections = createSelector([selectShop], shop => shop.collections);

//get an array of items (now that all our data is an object)
//we map the array of ['hats', 'sneakers', 'jackets', 'womens', 'mens'] to their respective objects
//instead of collections.key we use collections[key] because key is a variable that changes value
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => (collections ? Object.keys(collections).map(key => collections[key]) : []) //returns an array of items, in this case an array of objects, and if it gets a null value it returns an empty array
);

// create another output selector using previous output selector
// selectCollection is a function that returns a function
export const selectCollection = collectionUrlParam =>
  createSelector([selectCollections], collections => (collections ? collections[collectionUrlParam] : null));
