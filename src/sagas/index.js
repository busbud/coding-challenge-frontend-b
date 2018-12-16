import { all } from 'redux-saga/effects';

import { sagas as searchSagas } from '../domains/search';

export default function* rootSaga() {
  yield all([searchSagas()]);
}
