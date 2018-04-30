import { mergeChildReducers } from 'redux-loop';
import parent from './parent';
import metadata from './metadata';
import tripInformation from './tripInformation';

const rootReducer = (state, action) => {
  const parentResult = parent(state, action);
  return mergeChildReducers(parentResult, action, {
    metadata,
    tripInformation,
  });
};

export default rootReducer;
