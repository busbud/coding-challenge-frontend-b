import React from 'react';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('about_title')}</h1>
      <div
        style={{
          width: '200px',
          height: '200px',
          background: '#FF0000',
        }}
      >
        Deploy test
      </div>
    </>
  );
}

export default About;
