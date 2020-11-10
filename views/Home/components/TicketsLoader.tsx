import Styled from 'react-styles-injector';

import { Loader } from '@uiComponents/Loader';
import styles from './TicketsLoader.pcss';
import { EAppColors } from '@uiAssets/colors';
import { i18n } from '@utils/i18n';
import { homeTexts } from '@texts/home';

export const TicketsLoader = (): JSX.Element => (
  <Styled styles={styles}>
    <Loader color={EAppColors.MAIN} />
    <p>{i18n(homeTexts.loadingTicketsLabel)}</p>
  </Styled>
);
