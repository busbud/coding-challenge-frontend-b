import { take, call } from 'redux-saga/effects';

export default function* takeFirst(actionPattern, saga) {
  while (true) {
    const action = yield take(actionPattern);
    yield call(saga, action);
  }
}
