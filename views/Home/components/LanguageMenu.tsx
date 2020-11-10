import React from 'react';
import Acta from 'acta';
import Styled from 'react-styles-injector';

import { Button } from '@uiComponents/Button';
import styles from './LanguageMenu.pcss';
import { ELanguagesKeys } from '@constants/languages';
import { EActaStateKeys } from '@constants/actaKeys';

const onSelectLanguage = (languageKey: ELanguagesKeys) =>
  Acta.setState(
    {
      [EActaStateKeys.APPLICATION_LANGUAGE]: languageKey,
    },
    'localStorage',
  );

export const LanguageMenu = (): JSX.Element => {
  const currentLanguage = Acta.useActaState(
    EActaStateKeys.APPLICATION_LANGUAGE,
    ELanguagesKeys.DEFAULT,
  );
  const targetLanguage =
    currentLanguage === ELanguagesKeys.FR
      ? ELanguagesKeys.EN
      : ELanguagesKeys.FR;

  return (
    <Styled styles={styles}>
      <Button
        label={targetLanguage as string}
        onClick={() => onSelectLanguage(targetLanguage)}
      />
    </Styled>
  );
};
