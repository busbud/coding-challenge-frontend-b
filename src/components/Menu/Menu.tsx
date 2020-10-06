import React from "react";
import { useTranslation } from "react-i18next";

import { Lang } from "../../models/Lang";

import "./Menu.scss";
import { Navbar } from "react-bootstrap";

import MenuItem from "../MenuItem/MenuItem";

const langs: Lang[] = Lang.getLangs();

const Menu: React.FC = () => {
  const { i18n } = useTranslation();

  function changeLang(lang: Lang) {
    i18n.changeLanguage(lang.value);
  }

  return (
    <Navbar sticky="top">
      <Navbar.Brand href="#">Bosheaga</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {langs.map((lang: Lang, index: number) => (
          <MenuItem
            lang={lang}
            changeLang={changeLang}
            key={index}
          />
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
