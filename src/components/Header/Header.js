import React from "react";
import { useTranslation } from "react-i18next";
import "./Header.css";
// Images
import logo from "../../util/img/OsheagaLogo.png";
import oshee from "../../util/img/Oshee.png";
import aga from "../../util/img/Aga.png";

const Header = () => {
  const { t } = useTranslation();
  return (
    <div className='header'>
      <div className='header-container'>
        <img src={logo} className='osheaga-logo' alt='logo' />
        <h3 className='header-title'>
          {t(
            "Book your bus ticket to Montreal's biggest (and hottest) concert of the summer!"
          )}
        </h3>
        <div className='mascots'>
          <img src={oshee} className='oshee' alt='oshee' />
          <img src={aga} className='aga' alt='aga' />
        </div>
      </div>
    </div>
  );
};

export default Header;
