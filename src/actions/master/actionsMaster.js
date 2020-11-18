import { setLocale } from 'react-redux-i18n';

export function changeLanguageAction(ev) {
  return (dispatch, getState) => {
    dispatch(setLocale(ev.target.value));
  };
}
