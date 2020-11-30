import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { LocationChangeAction } from 'connected-react-router';
import { supportedLanguages } from '../../utils/language';
import { changeLanguageAction } from '../language/actions';

export function* locationChange(action: LocationChangeAction) {
    const path = action.payload.location.pathname;
    const language = path?.substring(1);
    if (supportedLanguages.some((l) => l.id === language)) {
        yield put(changeLanguageAction(language));
    }
}

function* watchLocationChange() {
    yield takeEvery('@@router/LOCATION_CHANGE', locationChange);
}

function* routerSaga() {
    yield all([fork(watchLocationChange)]);
}

export default routerSaga;
