import React from "react";
import "./Navbar.css";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { i18n } = useTranslation();
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className='navbar'>
      <button className='button' onClick={() => changeLanguage("en")}>
        En
      </button>
      <button className='button' onClick={() => changeLanguage("fr")}>
        Fr
      </button>
    </div>
  );
};

export default Navbar;
