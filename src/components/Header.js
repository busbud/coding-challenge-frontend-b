import React from 'react';
import { translate } from 'react-i18next';
import i18n from '../i18n/i18n';
import { getAvailableLanguages, langIdToName } from '../i18n/languages';
import SearchForm from './SearchForm';
import logo from '../images/osheaga-logo.jpg';

const Header = (props) => {
  // Language Options
  const langDropdownItems = (
    getAvailableLanguages().map(({ langId }) => (
      <option key={langId} value={langId}>
        { langIdToName(langId) }
      </option>
    ))
  );

  return (
    <div className="Header navbar is-fixed-top is-transparent has-shadow">
      <div className="container">

        <div className="navbar-brand">
          {/* Logo */}
          <div className="navbar-item">
            <img src={logo} alt="Osheaga Festival" />
          </div>

          {/* Burger menu button */}
          <button className="button navbar-burger" onClick={props.onMenuClick}>
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Navbar contents */}
        <div className={`navbar-menu${(props.isMenuActive ? ' is-active' : '')}`}>

          {/* Language selector */}
          <div className="navbar-start">
            <div className="navbar-item">
              <div className="control">
                <div className="select is-small is-fullwidth">
                  <select
                    defaultValue={langIdToName(props.currentLang)}
                    onChange={({ target }) => props.onLanguageClick(target.value)}
                  >
                    { langDropdownItems }
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Search form */}
          <div className="navbar-end">
            <div className="navbar-item">
              <SearchForm {...props} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

translate.setI18n(i18n);
export default translate()(Header);
