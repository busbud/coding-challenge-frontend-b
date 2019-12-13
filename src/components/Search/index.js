// thired part libraries
import React from 'react';
import { withTranslation } from "react-i18next";

// styles
import './Search.scss'

const Search = ({ t }) => (
  <div className='search-container'>
    <div className='form-item'>
      <label htmlFor='depart'>{t("From")}</label>
      <input className='form-input' defaultValue='New York' disabled />
    </div>
    <div className='form-item'>
      <label htmlFor='arrive'>{t("To")}</label>
      <input className='form-input' defaultValue='Montréal' disabled />
    </div>
    <div className='form-item'>
      <label htmlFor='date'>{t("On")}</label>
      <input className='form-input' defaultValue='2nd of August 2020' disabled />
    </div>
  </div>
)

export default withTranslation("translations")(Search);
