import React from 'react';
import injectSheet from 'react-jss';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import {languages} from '../config';

const column = {
  paddingLeft: 8,
  flex: 1,
  height: 48,
  whiteSpace: 'nowrap',
  lineHeight: '48px',
  paddingRight: 8,
  border: '1px solid #dbdbdb'
};

const styles = {
  column,
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    background: 'white',
    minHeight: 48,
    margin: 'auto',
    flexBasis: 800,
    alignItems: 'center'
  },
  header: {
    top: 0,
    position: 'fixed',
    display: 'flex',
    flex: 1,
    background: 'rgb(18, 124, 203)',
    minHeight: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    display: 'flex',
    position: 'absolute',
    ['@media (max-width: 1146px)']: {
      position: 'relative'
    },
    justifyContent: 'flex-start',
    marginLeft: 16,
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  brand: {
    marginRight: 16
  },
  headerContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
  }
};

function SearchHeader({classes, t, changeLanguage, i18n, date}) {

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
  classes: PropTypes.object,
  t: PropTypes.func,
  changeLanguage: PropTypes.func,
  date: PropTypes.string,
  i18n: PropTypes.object
};

export default injectSheet(styles)(translate('translations')(SearchHeader));
