import { createSelector } from 'reselect';

//input selector
const selectDirectory = state => state.directory;

//output selector - uses previous selectors
//follow the path from root-reducer.js to directory.reducer.js
export const selectDirectorySections = createSelector([selectDirectory], directory => directory.sections);
