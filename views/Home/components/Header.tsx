import Acta from 'acta';
import Styled from 'react-styles-injector';

import { EActaStateKeys } from '@constants/actaKeys';
import { ELanguagesKeys } from '@constants/languages';
import styles from './Header.pcss';

export const Header = (): JSX.Element => (
  <Styled styles={styles} tag="header">
    <div>
      <p>Osheaga</p>
      <p>
        {new Date('08-02-2020').toLocaleDateString(
          `${
            (Acta.getState(
              EActaStateKeys.APPLICATION_LANGUAGE,
            ) as ELanguagesKeys) || ELanguagesKeys.DEFAULT
          }-CA`,
        )}
      </p>
      <p>Montreal</p>
    </div>
  </Styled>
);
