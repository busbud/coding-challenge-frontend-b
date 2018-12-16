// import reducer, { initialState } from '../reducer';
// import * as ActionTypes from '../actionTypes';

// import { mapDocsToBooks } from '../formatters';

// describe('search domain reducer', () => {
//   it('should store the search filter value', () => {
//     const action = {
//       type: ActionTypes.SET_SEARCH_FILTER,
//       payload: 'Author',
//     };

//     expect(reducer(initialState, action)).toEqual({
//       ...initialState,
//       searchFilter: action.payload,
//     });
//   });

//   it('should replace the search filter value', () => {
//     const action = {
//       type: ActionTypes.SET_SEARCH_FILTER,
//       payload: 'Author',
//     };

//     const workingIntitalState = { ...initialState, searchFilter: 'tata' };
//     expect(reducer(workingIntitalState, action)).toEqual({
//       ...initialState,
//       searchFilter: action.payload,
//     });
//   });

//   it('should add previoulsy fetched results', () => {
//     const action = {
//       type: ActionTypes.PERFORM_SEARCH.SUCCEEDED,
//       payload: {
//         num_found: 666,
//         docs: [
//           {
//             author_name: ['billy bob joe'],
//             title_suggest: 'when the crow has flown',
//             first_publish_year: 19888,
//           },
//           {
//             author_name: ['santa maria perdita durango'],
//             title_suggest: 'the bible after saint Marcus the 5th',
//             first_publish_year: 19888,
//           },
//         ],
//       },
//     };
//     expect(reducer(initialState, action)).toEqual({
//       ...initialState,
//       itemCount: action.payload.num_found,
//       books: mapDocsToBooks(action.payload.docs),
//     });
//   });

//   it('should set the new search query attribute', () => {
//     const action = {
//       type: ActionTypes.UPDATE_SEARCH_QUERY.BASE,
//       payload: {
//         value: 'toto',
//         filter: 'yooo',
//         page: undefined,
//       },
//     };
//     expect(reducer(initialState, action)).toEqual({
//       ...initialState,
//       searchQuery: {
//         ...action.payload,
//       },
//     });
//   });
// });
