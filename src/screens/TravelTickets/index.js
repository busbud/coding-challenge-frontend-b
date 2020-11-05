// @flow
import React from 'react';
import BusBudSection from '../../containers/BusBudSection';

type Props = {
  currentLanguage: 'fr' | 'en'
}

function About(props: Props) {
  const { currentLanguage } = props;
  return (
    <BusBudSection currentLanguage={currentLanguage} />
  );
}

export default About;
