import * as types from './actionsTypes'
import { setActiveLanguage } from 'react-localize-redux';

export function translate(language){
  return function(dispatch){
    dispatch(setActiveLanguage(language));
  }
}
