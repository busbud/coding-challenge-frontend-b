import React from 'react';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import {languages} from '../config';
import classes from './searchHeader.less';

function SearchHeader({t, changeLanguage, i18n, date}) {

  return (
    <div className={classes.header}>
      <div className={classes.headerContainer}>
        <div className={classes.info}>
          <div className={classes.brand}><img src={'https://busbud.imgix.net/busbud-logos/busbud_logo.svg?auto=compress%2Cformat'}/></div>
          <div>
            <select onChange={changeLanguage} value={i18n.language}>
              {languages.map(lang => {
                return <option key={lang.value} value={lang.value}>{lang.display}</option>;
              })}
            </select>
          </div>
        </div>
        <div className={classes.container}>
          <div className={classes.column}>{t('from')}: New york</div>
          <div className={classes.column}>{t('to')}: Montréal</div>
          <div className={classes.column}>{date}</div>
          <div className={classes.column}>1 {t('adultPassager')}</div>
        </div>
      </div>
    </div>
  );
}


SearchHeader.propTypes = {
  t: PropTypes.func,
  changeLanguage: PropTypes.func,
  date: PropTypes.string,
  i18n: PropTypes.object
};

export default (translate('translations')(SearchHeader));
