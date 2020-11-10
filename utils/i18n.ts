import Acta from 'acta';

import { ELanguagesKeys } from '@constants/languages';
import { EActaStateKeys } from '@constants/actaKeys';
import { isObject } from './isObject';

export const i18n = (
  translationNode: Record<ELanguagesKeys, string>,
): string => {
  if (!translationNode) {
    throw new TypeError('YOU NEED A TRANSLATION NODE TO TRANSLATE.');
  }

  if (!isObject(translationNode)) {
    throw new TypeError('THE TRANSLATION NODE NEEDS TO BE AN OBJECT.');
  }

  const currentLanguage: ELanguagesKeys =
    (Acta.getState(EActaStateKeys.APPLICATION_LANGUAGE) as ELanguagesKeys) ||
    ELanguagesKeys.DEFAULT;

  if (!translationNode[currentLanguage]) {
    throw new Error(
      `THERE IS NO TRANSLATION FOR THIS NODE IN ${currentLanguage}.`,
    );
  }

  return String(translationNode[currentLanguage]);
};
