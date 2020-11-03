// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import ArtistsSection from '../../containers/ArtistsSection';
import { HomeTitle } from './styledComp';

function HomeScreen() {
  const { t } = useTranslation();
  return (
    <>
      <HomeTitle>
        {t('home_title')}
      </HomeTitle>
      <ArtistsSection />
    </>
  );
}

export default HomeScreen;
