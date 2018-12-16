import { createSelector } from 'reselect';

const searchSelector = state => state.search;

export const searchFilter = createSelector([searchSelector], search => search.searchFilter);
export const getBooks = createSelector([searchSelector], search => search.books);
export const getsearchQuery = createSelector([searchSelector], search => search.searchQuery);
export const getResultCount = createSelector([searchSelector], search => search.itemCount);
