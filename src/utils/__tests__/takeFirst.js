import { call, put, take } from 'redux-saga/effects';

import takeFirst from '../takeFirst';

const DUMMY_ACTION_PATTERN = 'DUMMY_ACTION';

function* sendDummyAction() {
  return yield put(() => ({
    type: DUMMY_ACTION_PATTERN,
  }));
}

describe('utils | takeFirst', () => {
  it('should start task to watch the passed action pattern', () => {
    // given
    const generator = takeFirst(DUMMY_ACTION_PATTERN, sendDummyAction);

    // when
    const takeFirstCall = generator.next().value;

    // then
    expect(takeFirstCall).toEqual(take(DUMMY_ACTION_PATTERN));
  });

  it('should call the returned take action with the right action', () => {
    // given
    const generator = takeFirst(DUMMY_ACTION_PATTERN, sendDummyAction);

    // when
    generator.next();
    const descriptor = generator.next(DUMMY_ACTION_PATTERN).value;

    // then
    expect(descriptor).toEqual(call(sendDummyAction, DUMMY_ACTION_PATTERN));
  });
});
