import React from 'react'

import classes from './Toolbar.module.sass'
import logoOsheaga from '../../shared/images/osheaga.png'

import { useTranslation } from 'react-i18next'

const Toolbar = () => {
  const { i18n } = useTranslation()
  return (
    <header className={classes.Toolbar}>
      <div className={classes.LogoContainer}>
        <img className={classes.Logo} src={logoOsheaga} alt='Osheaga festival' />
      </div>
      <div
        className={classes.ButtonEnglish + ' ' + (i18n.language === 'en' ? classes.Active : '')}
        onClick={() => i18n.changeLanguage('en')}
      >
        <div>EN</div>
      </div>
      <div
        className={classes.ButtonFrench + ' ' + (i18n.language === 'fr' ? classes.Active : '')}
        onClick={() => i18n.changeLanguage('fr')}
      >
        <div>FR</div>
      </div>
    </header>
  )
}

export default Toolbar
