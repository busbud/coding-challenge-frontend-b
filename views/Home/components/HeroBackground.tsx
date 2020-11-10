import Acta from 'acta';
import Styled from 'react-styles-injector';

import HeroEN from './hero_en.svg';
import HeroFR from './hero_fr.svg';
import styles from './HeroBackground.pcss';
import { EActaStateKeys } from '@constants/actaKeys';
import { ELanguagesKeys } from '@constants/languages';

export const HeroBackground = (): JSX.Element => (
  <Styled styles={styles}>
    {(Acta.getState(EActaStateKeys.APPLICATION_LANGUAGE) as ELanguagesKeys) ===
    ELanguagesKeys.FR ? (
      <HeroFR />
    ) : (
      <HeroEN />
    )}
  </Styled>
);
