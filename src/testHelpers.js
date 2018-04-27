import configureMockStore from 'redux-mock-store';

const middlewares = [];

const getMockStore = (initialState) => {
  return configureMockStore(middlewares)(initialState);
};

export default getMockStore;
