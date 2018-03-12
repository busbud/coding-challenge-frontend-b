import { combineReducers } from 'redux';
import globalReducer from '../containers/App/reducer';
import languageProviderReducer from '../containers/LanguageProvider/reducer';
import createReducer from '../reducers';

jest.mock('redux', () => ({
  combineReducers: jest.fn(),
}));

describe('reducers', () => {
  describe('createReducer', () => {
    it('should be a function', () => {
      expect(typeof createReducer).toBe('function');
    });

    it('should combine default reducers and provided ones', () => {
      // given
      const reducers = {
        fakeReducer_1: 'fakeReducer_1',
        fakeReducer_2: 'fakeReducer_2',
      };

      // when
      createReducer(reducers);

      // then
      expect(combineReducers).toHaveBeenCalledWith({
        global: globalReducer,
        language: languageProviderReducer,
        fakeReducer_1: 'fakeReducer_1',
        fakeReducer_2: 'fakeReducer_2',
      });
    });
  });
});
