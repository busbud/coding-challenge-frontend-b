import React from 'react';
import SearchForm from './SearchForm';
import logo from '../images/osheaga-logo.jpg';
import { getAvailableLanguages, langIdToName } from "../utils/utils";

import { translate } from 'react-i18next';
import i18n from '../i18n';

const Header = props => {

  const langDropdownItems = (
    getAvailableLanguages().map(({lang_id, name}) => (
      <option key={lang_id} value={lang_id}>
        { langIdToName(lang_id) }
      </option>
    ))
  );

  return (
    <div className="Header navbar is-fixed-top is-transparent has-shadow">
      <div className="container">

        <div className="navbar-brand">

          <div className="navbar-item">
            <img src={logo} alt="Osheaga Festival" />
          </div>

          <button className="button navbar-burger" onClick={props.onMenuClick}>
            <span/>
            <span/>
            <span/>
          </button>
        </div>

        <div className={'navbar-menu' + (props.isMenuActive ? ' is-active' : '')}>

          <div className="navbar-start">

            <div className="navbar-item">
              <div className="control">
                <div className="select is-small is-fullwidth">
                  <select
                    defaultValue={ langIdToName(props.currentLang) }
                    onChange={ ({target}) => props.onLanguageClick(target.value) }
                  >
                    { langDropdownItems }
                  </select>
                </div>
              </div>
            </div>

          </div>

          <div className="navbar-end">

            <div className="navbar-item">
              <SearchForm { ...props }/>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

translate.setI18n(i18n);
export default translate()(Header);
