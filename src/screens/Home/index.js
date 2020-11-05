// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import ArtistsSection from '../../containers/ArtistsSection';
import { HomeTitle, HomeWrapper } from './styledComponent';
import Banner from '../../components/Banner';
import logoSrc from '../../assets/images/Logo-Osheaga-FR-01.png';

function HomeScreen() {
  const { t } = useTranslation();
  return (
    <HomeWrapper>
      <img src={logoSrc} alt="Osheaga Festival" />
      <HomeTitle>
        {t('home_title')}
      </HomeTitle>
      <ArtistsSection />
      <Banner
        title={t('home_banner_cta_title')}
        content={t('home_banner_cta_content')}
        type="highlight"
        fixedTo="bottom"
        closable={isMobile}
        linkContent={t('home_banner_cta')}
        linkTo="/travel-tickets"
        textAlign="right"
      />
    </HomeWrapper>
  );
}

export default HomeScreen;
