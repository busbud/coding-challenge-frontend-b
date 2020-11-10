import React from 'react';
import Acta from 'acta';

import { GlobalStyles } from '@uiComponents/GlobalStyles';
import { EActaStateKeys } from '@constants/actaKeys';
import { ELanguagesKeys } from '@constants/languages';

export const GlobalLayout: React.FC = ({ children }) => {
  /**
   * Subscribe to the language global state
   */
  Acta.useActaState(
    EActaStateKeys.APPLICATION_LANGUAGE,
    ELanguagesKeys.DEFAULT,
  );

  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
};
