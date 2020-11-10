import React from 'react';
import Styled from 'react-styles-injector';

import GlobalStylesPCSS from './GlobalStyles.pcss';
import Animations from './Animations.pcss';

export const GlobalStyles = (): JSX.Element => (
  <Styled asFragment={true} styles={[GlobalStylesPCSS, Animations]} />
);
