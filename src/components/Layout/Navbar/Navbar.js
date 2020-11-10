import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import CurrencyContext from '../../../contexts/currencyContext';
import Dropdown from '../../shared/Dropdown/Dropdown';
import styles from './Navbar.module.scss';

const langOptions = ['en', 'fr'];
const currencyOptions = ['CAD', 'USD'];

const Navbar = (props) => {
  const { t, i18n } = useTranslation();
  const { changeCurrency } = useContext(CurrencyContext);

  const changLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const changCurrency = (e) => {
    changeCurrency(e.target.value);
  };

  return (
    <div className={styles.navbar}>
      <h2 className={styles.title}>{t('navbar.title')}</h2>
      <div className={styles.userNav}>
        <Dropdown
          options={langOptions}
          selectHandler={changLanguage}
          type="navbar"
        />
        <Dropdown
          options={currencyOptions}
          selectHandler={changCurrency}
          type="navbar"
        />
      </div>
    </div>
  );
};

export default Navbar;
