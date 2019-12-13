// thired part libraries
import React, { useState } from 'react';
import { withTranslation } from "react-i18next";

// styles
import './Navbar.scss'

const Navbar = ({ t, i18n }) => {
  // eslint-disable-next-line no-unused-vars
  const [lang, setLang] = useState(['en'])

  const handleClick = event => {
    console.log("selected val is ", event.target.value);
    let newlang = event.currentTarget.innerText;
    setLang({ value: newlang })
    console.log("state value is", newlang);
    i18n.changeLanguage(newlang);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-container__content">
        <div className="navbar-container__content__brand">
          <a href="/">Busbud</a>
        </div>
        <nav>
          <ul className="navbar-container__content__items">
            <li onClick={handleClick}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href='#' className="active">{t("English")}</a>
            </li>
            <li onClick={handleClick}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">{t("French")}</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default withTranslation("translations")(Navbar);
