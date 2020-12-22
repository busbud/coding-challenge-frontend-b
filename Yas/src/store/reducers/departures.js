import {isEqual} from 'lodash';
const initialState = {

};
 
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return isEqual(state, action.payload) ? state : action.payload;
    default:
      return state;
  }
};

