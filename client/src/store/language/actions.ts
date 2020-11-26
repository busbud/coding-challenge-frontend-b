import { createStandardAction } from 'typesafe-actions';


export const changeLanguageAction = createStandardAction(`CHANGE_LANGUAGE`)<string>();